from app import db
from sqlalchemy.dialects.postgresql import JSON

class SaleItem(db.Model):
	__tablename__ = 'sale_items'

	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String())
	cost = db.Column(db.Integer)
	description = db.Column(db.String())

	def __init__(self, name, cost, description):
		self.name = name
		self.cost = cost
		self.description = description

	def __repr__(self):
		return '<id {}>'.format(self.id)
