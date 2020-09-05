from flask import Flask

app = Flask(__name__, static_url_path='/')

@app.route('/api/hello-world')
def get_hello_world():
	return {'message' : "hello world"}
