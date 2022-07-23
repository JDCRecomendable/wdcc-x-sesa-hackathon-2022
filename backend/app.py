import json
from typing import List

from flask import Flask, render_template
from flask_cors import CORS

from db import MongoDBCommunicator
from utils.config_reader import get_value

app = Flask(__name__)
CORS(app)
username = get_value('username')
password = get_value('password')
url = get_value('url')
mongo_db_communicator = MongoDBCommunicator(username, password, url)


def craft_response(json_body, status_code):
    response = app.response_class(
        response=json.dumps(json_body),
        status=status_code,
        mimetype='application/json'
    )
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response


def is_missing_params(request_json: dict, expected_values: List[str]) -> bool:
    for expected_value in expected_values:
        if expected_value not in request_json:
            return True
    return False


def user_id_is_invalid(user_id: str) -> bool:
    result = mongo_db_communicator.query_one_from_collection_by_id('users', user_id)
    return result[0] is False


# COMMON
@app.route('/')
def hello_world():  # put application's code here
    return render_template('api.html')


@app.route('/test')
def test_area():
    return str(user_id_is_invalid('1'))


@app.route('/common/<user_id>/attack/', methods=['POST'])
@app.route('/common/<user_id>/attack', methods=['POST'])
def attack(user_id='John'):
    return 'UNDER CONSTRUCTION'


@app.route('/common/<user_id>/is-attacked/', methods=['POST'])
@app.route('/common/<user_id>/is-attacked', methods=['POST'])
def is_attacked(user_id='John'):
    return 'UNDER CONSTRUCTION'


# CHROME EXTENSION
@app.route('/ext/<user_id>/switch-tabs/', methods=['GET'])
@app.route('/ext/<user_id>/switch-tabs', methods=['GET'])
def ext_switch_tabs(user_id='John'):
    return 'UNDER CONSTRUCTION'


@app.route('/ext/<user_id>/progress-full/', methods=['POST'])
@app.route('/ext/<user_id>/progress-full', methods=['POST'])
def ext_progress_full(user_id='John'):
    return 'UNDER CONSTRUCTION'


@app.route('/ext/<user_id>/progress-empty/', methods=['POST'])
@app.route('/ext/<user_id>/progress-empty', methods=['POST'])
def ext_progress_empty(user_id='John'):
    return 'UNDER CONSTRUCTION'


# WEB APP - SHOP PAGE
@app.route('/app/<user_id>/shop/', methods=['GET'])
@app.route('/app/<user_id>/shop', methods=['GET'])
def app_shop(user_id='John'):
    return 'UNDER CONSTRUCTION'


# WEB APP - ROOM PAGE
@app.route('/app/<user_id>/room/', methods=['GET'])
@app.route('/app/<user_id>/room', methods=['GET'])
def app_room(user_id='John'):
    return 'UNDER CONSTRUCTION'


@app.route('/app/<user_id>/add-room/', methods=['POST'])
@app.route('/app/<user_id>/add-room', methods=['POST'])
def app_room_create_or_join(user_id='John'):
    return 'UNDER CONSTRUCTION'


@app.route('/app/<user_id>/add-to-whitelist/', methods=['POST'])
@app.route('/app/<user_id>/add-to-whitelist', methods=['POST'])
def app_add_to_whitelist(user_id='John'):
    return 'UNDER CONSTRUCTION'


@app.route('/app/<user_id>/add-to-blacklist/', methods=['POST'])
@app.route('/app/<user_id>/add-to-blacklist', methods=['POST'])
def app_add_to_blacklist(user_id='John'):
    return 'UNDER CONSTRUCTION'


if __name__ == '__main__':
    app.run()
