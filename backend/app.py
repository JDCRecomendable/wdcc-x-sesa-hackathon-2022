from flask import Flask

from db import MongoDBCommunicator
from utils.config_reader import get_value

app = Flask(__name__)
username = get_value('username')
password = get_value('password')
url = get_value('url')
mongo_db_communicator = MongoDBCommunicator(username, password, url)


@app.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'


if __name__ == '__main__':
    app.run()
