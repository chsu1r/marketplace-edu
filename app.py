from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
import os
import json
import pyrebase

app = Flask(__name__, static_folder='./build', static_url_path='/')
app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
from models import SaleItem

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
    
    def get_item_image_url(self, item_id):
        """Get item img url."""
        img_url = self.storage.child('images').child(
            str(item_id) + ".jpg").get_url(None)
        return img_url

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
	return {'message' : "hello world"}

@app.route('/api/add-item', methods=['POST'])
def add_item():
    data = json.loads(request.data)
    name = data.get("name", "")
    description = data.get("description", "")
    cost = data.get("cost", 0)
    try:
        item = SaleItem(
            name=name,
            description=description,
            cost=cost,
            seller_username=seller_username
        )
        db.session.add(item)
        db.session.commit()
        return {'status':200}
    except:
        errors.append("Unable to add item to database.")
        return {'status':400}
    

@app.route('/api/get-items', methods=['GET'])
def get_items():
    items = []
    total_items = db.session.query(SaleItem).all()
    for item in total_items:
        items.append({'id':item.id, 'name':item.name,'cost':item.cost,'description':item.description,'seller_username':item.seller_username,'img_url':db_service.get_item_image_url(item.id)})
    return {"items" : items, "status": 200}

if __name__ == "__main__":
    # Only for debugging while developing
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))
