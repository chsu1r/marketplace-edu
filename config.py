import os

basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
	DEBUG = False
	TESTING = False
	CSRF_ENABLED = True
	SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', "")

class StagingConfig(Config):
	FIREBASE_API_KEY = os.environ['STAGING_FIREBASE_API_KEY']
	DEVELOPMENT = True
	DEBUG = True
	SQLALCHEMY_DATABASE_URI = "postgresql:///marketplace_edu_staging"

class DevelopmentConfig(Config):
	FIREBASE_API_KEY = os.environ['STAGING_FIREBASE_API_KEY']
	DEVELOPMENT = True
	DEBUG = True
	SQLALCHEMY_DATABASE_URI = "postgresql:///marketplace_edu_staging"
