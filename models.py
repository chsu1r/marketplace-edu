from app import db
from sqlalchemy.dialects.postgresql import JSON, ARRAY
from sqlalchemy import text

class SaleItem(db.Model):
	__tablename__ = 'sale_items'

	id = db.Column(db.String(), primary_key=True)
	name = db.Column(db.String(), nullable=False, server_default="")
	cost = db.Column(db.Integer, nullable=False, server_default=text("0"))
	description = db.Column(db.String(), server_default="")
	seller_username = db.Column(db.String(), nullable=False)
	sale_id = db.Column(db.String())
	claimed = db.Column(db.ARRAY(db.String), server_default="{}")
	draft = db.Column(db.Boolean, server_default='f')
	# TODO(clhsu): Add payment method List
	# TODO(clhsu): Add pickup/delivery
	# TODO(clhsu): Add location if pickup, nullable

	def __init__(self, item_id, name, cost, description, seller_username, draft, sale_id=None):
		self.id = item_id
		self.name = name
		self.cost = cost
		self.description = description
		self.seller_username = seller_username
		self.claimed = []
		self.draft = draft
		self.sale_id = sale_id

	def to_json(self):
		return {
			"id" : self.id,
			"name" : self.name,
			"cost" : self.cost,
			"description" : self.description,
			"seller_username" : self.seller_username,
			"claimed" : self.claimed,
			"draft" : self.draft,
			"sale_id" : self.sale_id
		}


class HostSale(db.Model):
	__tablename__ = 'sales'

	sale_id = db.Column(db.String(), primary_key=True)
	name = db.Column(db.String(), server_default="")
	seller_username = db.Column(db.String(), nullable=False)
	draft = db.Column(db.Boolean, server_default='f')

	def __init__(self, sale_id, name, seller_username, draft):
		self.sale_id = sale_id
		self.name = name
		self.seller_username = seller_username
		self.draft = draft

	def to_json(self):
		return {
			"sale_id" : self.sale_id,
			"name" : self.name,
			"seller_username" : self.seller_username,
			"draft" : self.draft
		}


class User(db.Model):
	__tablename__ = 'users'

	firebase_id = db.Column(db.String(), nullable=False)
	name = db.Column(db.String(), nullable=False, server_default="")
	username = db.Column(db.String(), nullable=False, primary_key=True)
	email = db.Column(db.String(), nullable=False, server_default="")
	campus = db.Column(db.ARRAY(db.String), nullable=False, server_default="{}")
	year = db.Column(db.String(), nullable=False)

	def __init__(self, firebase_id, name, username, email, campus, year):
		self.firebase_id = firebase_id
		self.name= name
		self.username = username
		self.email = email
		self.year = year
		self.campus = campus

	def to_json(self):
		return {
			"firebase_id" : self.firebase_id,
			"name" : self.name,
			"username" : self.username,
			"email" : self.email,
			"year" : self.year,
			"campus" : self.campus
		}
