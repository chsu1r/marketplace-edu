from flask import Flask, request, abort
from flask_sqlalchemy import SQLAlchemy
import os
import json
import hashlib
import pyrebase
from requests import HTTPError
import requests
from urllib.parse import urlencode, quote
from api.util.id_resources import get_random_alphanumeric_string

app = Flask(__name__, static_folder='./build', static_url_path='/')
app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
from models import SaleItem, User

class FirebaseAccess:
    """Setup for firebase refs."""

    def __init__(self, api_key, debug=False):
        firebase_config = {
            "apiKey": api_key,
            "authDomain": "marketplace-edu-staging.firebaseapp.com",
            "databaseURL": "https://marketplace-edu-staging.firebaseio.com",
            "projectId": "marketplace-edu-staging",
            "storageBucket": "marketplace-edu-staging.appspot.com",
            "messagingSenderId": "971511782436",
            "appId": "1:971511782436:web:f94a61caa5f6455dc78cb1",
            "measurementId": "G-8VPRQL7BFE"
        }
        firebase = pyrebase.initialize_app(firebase_config)
        self.auth = firebase.auth()
        self.storage = firebase.storage()
        self.api_key = api_key

    def get_item_image_url(self, item_id):
        """Get item img url."""
        img_url = self.storage.child('images').child(
            str(item_id) + ".jpg").get_url(None)
        return img_url

    def raise_detailed_error(self, request_object):
        """Error message handingling."""
        try:
            request_object.raise_for_status()
        except HTTPError as err:
            # raise detailed error message
            # TODO: Check if we get a { "error" : "Permission denied." } and handle automatically
            raise HTTPError(err, response=request_object.json())

    def get_user_account(self, token):
        """Get user info from the firebase authentication database."""
        parameters = {}
        parameters['key'] = self.api_key
        request_ref = \
            "https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo?{0}".format(
                urlencode(parameters))
        headers = {"content-type": "application/json; charset=UTF-8"}
        data = json.dumps({"idToken": token})
        request_object = requests.post(request_ref, headers=headers, data=data)
        self.raise_detailed_error(request_object)
        return request_object.json()

db_service = FirebaseAccess(app.config["FIREBASE_API_KEY"])
        
@app.route('/<path:path>')
@app.route('/', methods=['GET'], defaults={'path': ''})
def index():
	return app.send_static_file('index.html')

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

@app.route('/api/hello-world')
def get_hello_world():
	return {'message' : "Backend API successfully connected :D"}

@app.route('/api/add-item', methods=['POST'])
def add_item():
    data = json.loads(request.data)
    name = data.get("name", "")
    description = data.get("description", "")
    cost = data.get("cost", 0)
    random_id = get_random_alphanumeric_string(20)
    try:
        item = SaleItem(
            item_id=random_id,
            name=name,
            description=description,
            cost=cost,
            seller_username=seller_username
        )
        db.session.add(item)
        db.session.commit()
        return {'status':200}
    except:
        print("Unable to add item to database.")
        raise HTTPError
    

@app.route('/api/get-items', methods=['GET'])
def get_items():
    items = []
    total_items = db.session.query(SaleItem).all()
    for item in total_items:
        items.append({'id':item.id, 'name':item.name,'cost':item.cost,'description':item.description,'seller_username':item.seller_username,'img_url':db_service.get_item_image_url(item.id)})
    return {"items" : items, "status": 200}


@app.route('/api/add-user', methods=['POST'])
def add_user():
    # Check for a token
    if 'authorization' not in request.headers and 'Bearer ' not in request.headers.get('authorization'):
        print("Not authorized.")
        return abort(403)

    id_token = request.headers.get('Authorization').split('Bearer ')[1]

    # Check to see if the token is a matching user account
    try:
        decoded_id_token = db_service.get_user_account(id_token)
    except HTTPError as err:
        print("No user account found for that token. ", err)
        return abort(403)

    data = json.loads(request.data)
    
    # Check to see whether the user to be added matches that account.
    firebase_id_hash = data.get("firebase_id_hash", "")
    localId = decoded_id_token['users'][0]["localId"]

    if firebase_id_hash != hashlib.sha256(localId.encode('utf-8')).hexdigest():
        print("User account does not match. ", firebase_id_hash, localId)
        return abort(403)

    name = data.get("name", "")
    email = data.get("email", "")
    campus = data.get("campus", [])
    year = data.get("year", "")
    if not campus or year is "" or email == "" or name == "":
        print("Fields not filled out with data: ", data)
        return abort(403)
    username = email.split("@")[0]
    if not username:
        print("Username bad: ", data)
        return abort(403)
    try:
        user = User(
            firebase_id=localId,
            name=name,
            email=email,
            year=year,
            campus=campus,
            username=username
        )
        db.session.add(user)
        db.session.commit()
        return {'status':200, 'message': {"campus":campus}}
    except:
        print("Unable to add user to database.")
        raise HTTPError

if __name__ == "__main__":
    # Only for debugging while developing
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))
