import json
from typing import List

from flask import Flask, render_template, request
from flask_cors import CORS

import models.common
import models.item
import models.room
import models.user
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


def respond_error(message: str) -> dict:
    return craft_response({'status': False, 'statusDescription': message}, 400)


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
    expected_params = ['tgtUserID', 'attackID']
    if is_missing_params(request.get_json(), expected_params):
        return respond_error('Missing or invalid parameters')
    if user_id_is_invalid(user_id):
        return respond_error('Invalid user ID')
    src_user_details = mongo_db_communicator.query_one_from_collection_by_id('users', user_id)
    src_user_active_room = models.user.get_current_room(src_user_details[1])
    tgt_user_id = request.get_json()['tgtUserID']
    tgt_user_details = mongo_db_communicator.query_one_from_collection_by_id('users', tgt_user_id)
    tgt_user_active_room = models.user.get_current_room(tgt_user_details[1])

    if src_user_active_room != tgt_user_active_room:
        return respond_error('Target user not in the same room')

    room_details = mongo_db_communicator.query_one_from_collection_by_id('rooms', src_user_active_room)
    if not room_details[0]:
        return respond_error('Room not available')

    attack_id = request.get_json()['attackID']
    attack_details = mongo_db_communicator.query_one_from_collection_by_id('attacks', attack_id)
    if not attack_details[0]:
        return respond_error('Attack item ID not available')
    attack_cost = models.item.get_cost(attack_details)
    src_user_points = models.room.get_member_points(room_details, user_id)
    if attack_cost > src_user_points:
        return respond_error('Not enough points')

    new_data = models.room.add_to_attack_queue(room_details, user_id, tgt_user_id, request.get_json()['attackID'])
    new_data = models.room.increase_member_points(new_data, user_id, -attack_cost)

    mongo_db_communicator.update_one_in_collection_by_id('rooms', src_user_active_room, new_data)


@app.route('/common/<user_id>/is-attacked/', methods=['POST'])
@app.route('/common/<user_id>/is-attacked', methods=['POST'])
def is_attacked(user_id='John'):
    if user_id_is_invalid(user_id):
        return respond_error('Invalid user ID')
    # TODO


# CHROME EXTENSION
@app.route('/ext/<user_id>/switch-tabs/', methods=['GET'])
@app.route('/ext/<user_id>/switch-tabs', methods=['GET'])
def ext_switch_tabs(user_id='John'):
    expected_params = ['timeProgress', 'newDomain']
    if is_missing_params(request.get_json(), expected_params):
        return respond_error('Missing or invalid parameters')
    if user_id_is_invalid(user_id):
        return respond_error('Invalid user ID')
    # TODO


@app.route('/ext/<user_id>/progress-full/', methods=['POST'])
@app.route('/ext/<user_id>/progress-full', methods=['POST'])
def ext_progress_full(user_id='John'):
    if user_id_is_invalid(user_id):
        return respond_error('Invalid user ID')
    # TODO


@app.route('/ext/<user_id>/progress-empty/', methods=['POST'])
@app.route('/ext/<user_id>/progress-empty', methods=['POST'])
def ext_progress_empty(user_id='John'):
    if user_id_is_invalid(user_id):
        return respond_error('Invalid user ID')
    # TODO


# WEB APP - SHOP PAGE
@app.route('/app/<user_id>/shop/', methods=['GET'])
@app.route('/app/<user_id>/shop', methods=['GET'])
def app_shop(user_id='John'):
    if user_id_is_invalid(user_id):
        return respond_error('Invalid user ID')
    # TODO


# WEB APP - ROOM PAGE
@app.route('/app/<user_id>/room/', methods=['GET'])
@app.route('/app/<user_id>/room', methods=['GET'])
def app_room(user_id='John'):
    if user_id_is_invalid(user_id):
        return respond_error('Invalid user ID')
    # TODO


@app.route('/app/<user_id>/add-room/', methods=['POST'])
@app.route('/app/<user_id>/add-room', methods=['POST'])
def app_room_create_or_join(user_id='John'):
    expected_params = ['addType', 'value']
    if is_missing_params(request.get_json(), expected_params):
        return respond_error('Missing or invalid parameters')
    if user_id_is_invalid(user_id):
        return respond_error('Invalid user ID')
    # TODO


@app.route('/app/<user_id>/add-to-whitelist/', methods=['POST'])
@app.route('/app/<user_id>/add-to-whitelist', methods=['POST'])
def app_add_to_whitelist(user_id='John'):
    expected_params = ['domains']
    if is_missing_params(request.get_json(), expected_params):
        return respond_error('Missing or invalid parameters')
    if user_id_is_invalid(user_id):
        return respond_error('Invalid user ID')
    # TODO


@app.route('/app/<user_id>/add-to-blacklist/', methods=['POST'])
@app.route('/app/<user_id>/add-to-blacklist', methods=['POST'])
def app_add_to_blacklist(user_id='John'):
    expected_params = ['domains']
    if is_missing_params(request.get_json(), expected_params):
        return respond_error('Missing or invalid parameters')
    if user_id_is_invalid(user_id):
        return respond_error('Invalid user ID')
    # TODO


if __name__ == '__main__':
    app.run()
