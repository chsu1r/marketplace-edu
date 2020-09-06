from app import db
from sqlalchemy.dialects.postgresql import JSON

class SaleItem(db.Model):
	__tablename__ = 'sale_items'

	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String(), nullable=False)
	cost = db.Column(db.Integer, nullable=False)
	description = db.Column(db.String())
	seller_username = db.Column(db.String(), nullable=False)

	def __init__(self, name, cost, description, seller_username):
		self.name = name
		self.cost = cost
		self.description = description
		self.seller_username = seller_username


class User(db.Model):
	__tablename__ = 'users'

	firebase_id = db.Column(db.String(), nullable=False, primary_key=True)
	name = db.Column(db.String(), nullable=False)
	username = db.Column(db.String(), nullable=False)
	email = db.Column(db.String(), nullable=False)

	def __init__(self, firebase_id, name, username, email):
		self.firebase_id = firebase_id
		self.name= name
		self.username = username
		self.email = email

