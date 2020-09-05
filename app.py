from flask import Flask
import os

app = Flask(__name__, static_folder='../build', static_url_path='/')

@app.route('/', methods=['GET'])
def index():
	return app.send_static_file('index.html')

@app.route('/api/hello-world')
def get_hello_world():
	return {'message' : "hello world"}

if __name__ == "__main__":
    # Only for debugging while developing
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))