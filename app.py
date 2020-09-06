from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
import os
import json

app = Flask(__name__, static_folder='./build', static_url_path='/')
app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
from models import SaleItem

@app.route('/', methods=['GET'])
def index():
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
    items = {}
    total_items = db.session.query(SaleItem).all()
    for item in total_items:
        items[item.id] = {'name':item.name,'cost':item.cost,'description':item.description,'seller_username':item.seller_username}
    return items

if __name__ == "__main__":
    # Only for debugging while developing
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))
