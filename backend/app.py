from flask import Flask

from db import MongoDBCommunicator
from utils.config_reader import get_value

app = Flask(__name__)
username = get_value('username')
password = get_value('password')
url = get_value('url')
mongo_db_communicator = MongoDBCommunicator(username, password, url)


# COMMON
@app.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'


@app.route('/api/v0/attack/', methods=['POST'])
@app.route('/api/v0/attack', methods=['POST'])
def attack():
    pass


@app.route('/api/v0/is-attack-coming/', methods=['POST'])
@app.route('/api/v0/is-attack-coming', methods=['POST'])
def is_attack_coming():
    pass


# CHROME EXTENSION
@app.route('/api/v0/ext/enter/', methods=['GET'])
@app.route('/api/v0/ext/enter', methods=['GET'])
def ext_enter():
    pass


@app.route('/api/v0/ext/leave/', methods=['POST'])
@app.route('/api/v0/ext/leave', methods=['POST'])
def ext_leave():
    pass


@app.route('/api/v0/ext/progress-full/', methods=['POST'])
@app.route('/api/v0/ext/progress-full', methods=['POST'])
def ext_progress_full():
    pass


@app.route('/api/v0/ext/progress-empty/', methods=['POST'])
@app.route('/api/v0/ext/progress-empty', methods=['POST'])
def ext_progress_empty():
    pass


# WEB APP - SHOP PAGE
@app.route('/api/v0/app/shop/', methods=['GET'])
@app.route('/api/v0/app/shop', methods=['GET'])
def app_shop_get():
    pass


# WEB APP - ROOM PAGE
@app.route('/api/v0/app/room/', methods=['GET'])
@app.route('/api/v0/app/room', methods=['GET'])
def app_room_get():
    pass


@app.route('/api/v0/app/room/add-room/', methods=['POST'])
@app.route('/api/v0/app/room/add-room', methods=['POST'])
def app_room_create_or_join():
    pass


@app.route('/api/v0/app/room/add-to-whitelist/', methods=['POST'])
@app.route('/api/v0/app/room/add-to-whitelist', methods=['POST'])
def add_to_whitelist():
    pass


@app.route('/api/v0/app/room/bulk-add-to-whitelist/', methods=['POST'])
@app.route('/api/v0/app/room/bulk-add-to-whitelist', methods=['POST'])
def add_to_whitelist_bulk():
    pass


@app.route('/api/v0/app/room/add-to-blacklist/', methods=['POST'])
@app.route('/api/v0/app/room/add-to-blacklist', methods=['POST'])
def add_to_blacklist():
    pass


@app.route('/api/v0/app/room/bulk-add-to-blacklist/', methods=['POST'])
@app.route('/api/v0/app/room/bulk-add-to-blacklist', methods=['POST'])
def add_to_blacklist_bulk():
    pass


if __name__ == '__main__':
    app.run()
