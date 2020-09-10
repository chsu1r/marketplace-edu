from app import db
from sqlalchemy.dialects.postgresql import JSON, ARRAY
from sqlalchemy import text

class SaleItem(db.Model):
	__tablename__ = 'sale_items'

	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String(), nullable=False, server_default="")
	cost = db.Column(db.Integer, nullable=False, server_default=text("0"))
	description = db.Column(db.String(), server_default="")
	seller_username = db.Column(db.String(), nullable=False)
	# TODO(clhsu): Add payment method List
	# TODO(clhsu): Add pickup/delivery

	def __init__(self, item_id, name, cost, description, seller_username):
		self.id = item_id
		self.name = name
		self.cost = cost
		self.description = description
		self.seller_username = seller_username


class User(db.Model):
	__tablename__ = 'users'

	firebase_id = db.Column(db.String(), nullable=False)
	name = db.Column(db.String(), nullable=False, server_default="")
	username = db.Column(db.String(), nullable=False, primary_key=True)
	email = db.Column(db.String(), nullable=False, server_default="{}")
	campus = db.Column(db.ARRAY(db.String), nullable=False, server_default="{}")
	year = db.Column(db.String(), nullable=False)

	def __init__(self, firebase_id, name, username, email, campus, year):
		self.firebase_id = firebase_id
		self.name= name
		self.username = username
		self.email = email
		self.year = year
		self.campus = campus
