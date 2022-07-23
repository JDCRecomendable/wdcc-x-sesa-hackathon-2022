from flask import Flask

from db import MongoDBCommunicator
from utils.config_reader import get_value

app = Flask(__name__)
username = get_value('username')
password = get_value('password')
url = get_value('url')
mongo_db_communicator = MongoDBCommunicator(username, password, url)


# GENERAL
@app.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'


@app.route('/api/v0/<user_id>/attack/', methods=['POST'])
@app.route('/api/v0/<user_id>/attack', methods=['POST'])
def attack(user_id='1'):
    pass


@app.route('/api/v0/<user_id>/is-attack-coming/', methods=['POST'])
@app.route('/api/v0/<user_id>/is-attack-coming', methods=['POST'])
def is_attack_coming(user_id='1'):
    pass


# CHROME EXTENSION
@app.route('/api/v0/<user_id>/ext/enter/', methods=['POST'])
@app.route('/api/v0/<user_id>/ext/enter', methods=['POST'])
def ext_enter(user_id='1'):
    pass


@app.route('/api/v0/<user_id>/ext/leave/', methods=['POST'])
@app.route('/api/v0/<user_id>/ext/leave', methods=['POST'])
def ext_leave(user_id='1'):
    pass


@app.route('/api/v0/<user_id>/ext/progress-full/', methods=['POST'])
@app.route('/api/v0/<user_id>/ext/progress-full', methods=['POST'])
def ext_progress_full(user_id='1'):
    pass


@app.route('/api/v0/<user_id>/ext/progress-empty/', methods=['POST'])
@app.route('/api/v0/<user_id>/ext/progress-empty', methods=['POST'])
def ext_progress_empty(user_id='1'):
    pass



if __name__ == '__main__':
    app.run()
