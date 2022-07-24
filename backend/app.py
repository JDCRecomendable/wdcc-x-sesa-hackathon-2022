import json
import random
from typing import List

from flask import Flask, render_template, request
from flask_cors import CORS

import models.common
import models.item
import models.room
import models.user
from db import MongoDBCommunicator
from utils.config_reader import get_value

POINTS_DIFF = 500
SHIELD_COST = 250
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
    sample_room_details = {
        "_id": 1,
        "name": "Work Room",
        "ownerUserID": "John",
        "whitelistDomains": [
            "teams.microsoft.com",
            "slack.com",
            "jira.com"
        ],
        "blacklistDomains": [
            "reddit.com",
            "twitter.com"
        ],
        "members": [
            {
                "userID": "John",
                "points": 750,
                "timeProgress": 80,
                "numberOfShields": 3
            }
        ],
        "attackQueue": [
            {
                "srcUserID": "John",
                "tgtUserID": "John",
                "attackID": 1,
                "isSuccessful": False,
                "completed": False
            }
        ]
    }
    text_to_display = str('OLD\n{}\n\n'.format(str(sample_room_details)))
    models.room.set_member_time_progress(sample_room_details, 'John', 120)
    text_to_display += str('NEW\n{}\n\n'.format(str(sample_room_details)))
    return str(text_to_display)


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
    attack_desc = request.get_json()['details']
    attack_details = mongo_db_communicator.query_one_from_collection_by_id('items', attack_id)
    if not attack_details[0]:
        return respond_error('Attack item ID not available')
    attack_cost = models.item.get_cost(attack_details[1])
    src_user_points = models.room.get_member_points(room_details[1], user_id)
    if attack_cost > src_user_points:
        return respond_error('Not enough points')

    new_data = models.room.add_to_attack_queue(room_details[1], user_id, tgt_user_id, attack_id, attack_desc)
    new_data = models.room.increase_member_points(new_data, user_id, -attack_cost)

    mongo_db_communicator.update_one_in_collection_by_id('rooms', src_user_active_room, new_data)

    return craft_response({
        'status': True,
        'statusDescription': 'Successful'
    }, 200)


@app.route('/common/<user_id>/buy-shield/', methods=['POST'])
@app.route('/common/<user_id>/buy-shield', methods=['POST'])
def buy_shield(user_id='John'):
    if user_id_is_invalid(user_id):
        return respond_error('Invalid user ID')

    user_details = mongo_db_communicator.query_one_from_collection_by_id('users', user_id)[1]
    room_details = mongo_db_communicator.query_one_from_collection_by_id('rooms', user_details['currentRoomID'])
    if not room_details[0]:
        return respond_error('Room not available')

    user_points = models.room.get_member_points(room_details[1], user_id)
    if SHIELD_COST > user_points:
        return respond_error('Not enough points')

    new_data = models.room.increase_member_number_of_shields(room_details[1], user_id, 1)
    new_data = models.room.increase_member_points(new_data, user_id, -SHIELD_COST)
    mongo_db_communicator.update_one_in_collection_by_id('rooms', room_details[1]['_id'], new_data)
    new_data = mongo_db_communicator.query_one_from_collection_by_id('rooms', user_details['currentRoomID'])[1]
    new_points = models.room.get_member_points(new_data, user_id)

    return craft_response({
        'status': True,
        'statusDescription': 'Successful',
        'points': new_points
    }, 200)


@app.route('/common/<user_id>/is-attacked/', methods=['POST'])
@app.route('/common/<user_id>/is-attacked', methods=['POST'])
def is_attacked(user_id='John'):
    if user_id_is_invalid(user_id):
        return respond_error('Invalid user ID')

    user_details = mongo_db_communicator.query_one_from_collection_by_id('users', user_id)[1]
    room_details = mongo_db_communicator.query_one_from_collection_by_id('rooms', user_details['currentRoomID'])
    if not room_details[0]:
        return respond_error('Room not available')

    pending_attacks = models.room.get_pending_attacks_for_tgt_user(room_details[1], user_id)
    number_of_shields = models.room.get_member_number_of_shields(room_details[1], user_id)
    if len(pending_attacks) == 0:
        return craft_response({
            'status': True,
            'statusDescription': 'No pending attacks',
            'isAttacked': False,
            'attackID': -1,
            'details': '',
            'numberOfShields': number_of_shields
        }, 200)

    attack_details = pending_attacks[0]

    if number_of_shields > 0:
        number_of_shields -= 1
        models.room.update_pending_attack_status(attack_details, False)
        new_data = models.room.increase_member_number_of_shields(room_details[1], user_id, -number_of_shields)
        mongo_db_communicator.update_one_in_collection_by_id('rooms', room_details[1]['_id'], new_data)
        return craft_response({
            'status': True,
            'statusDescription': 'Decreased shield by 1',
            'isAttacked': False,
            'attackID': -1,
            'details': '',
            'numberOfShields': number_of_shields
        }, 200)

    models.room.update_pending_attack_status(attack_details, True)
    return craft_response({
        'status': True,
        'statusDescription': 'Attack sent',
        'isAttacked': True,
        'attackID': attack_details['attackID'],
        'details': attack_details['details'],
        'numberOfShields': number_of_shields
    }, 200)


@app.route('/common/<user_id>/details/', methods=['GET'])
@app.route('/common/<user_id>/details', methods=['GET'])
def get_user_details(user_id='John'):
    if user_id_is_invalid(user_id):
        return respond_error('Invalid user ID')

    user_details = mongo_db_communicator.query_one_from_collection_by_id('users', user_id)[1]
    room_details = mongo_db_communicator.query_one_from_collection_by_id('rooms', user_details['currentRoomID'])
    if not room_details[0]:
        return respond_error('Room not available')

    profile_photo_url = models.user.get_profile_photo_url(user_details)
    current_room = models.user.get_current_room(user_details)
    points = models.room.get_member_points(room_details[1], user_id)
    time_progress = models.room.get_member_time_progress(room_details[1], user_id)
    number_of_shields = models.room.get_member_number_of_shields(room_details[1], user_id)

    return craft_response({
        'status': True,
        'statusDescription': 'Successful',
        'userID': user_id,
        'profilePhoto': profile_photo_url,
        'points': points,
        'timeProgress': time_progress,
        'numberOfShields': number_of_shields
    }, 200)



# CHROME EXTENSION
@app.route('/ext/<user_id>/switch-tabs/', methods=['GET'])
@app.route('/ext/<user_id>/switch-tabs', methods=['GET'])
def ext_switch_tabs(user_id='John'):
    expected_params = ['timeProgress', 'newDomain']
    if is_missing_params(request.get_json(), expected_params):
        return respond_error('Missing or invalid parameters')
    if user_id_is_invalid(user_id):
        return respond_error('Invalid user ID')

    user_details = mongo_db_communicator.query_one_from_collection_by_id('users', user_id)[1]
    room_details = mongo_db_communicator.query_one_from_collection_by_id('rooms', user_details['currentRoomID'])
    if not room_details[0]:
        return respond_error('Room not available')

    new_data = models.room.increase_member_time_progress(room_details[1], user_id, request.get_json()['timeProgress'])
    mongo_db_communicator.update_one_in_collection_by_id('rooms', room_details[1]['_id'], new_data)
    domain = request.get_json()['newDomain']
    is_whitelist = False
    is_blacklist = False
    if models.room.is_whitelist_domain(room_details[1], domain):
        is_whitelist = True
    if models.room.is_blacklist_domain(room_details[1], domain):
        is_blacklist = True
    member_points = models.room.get_member_points(room_details[1], user_id)

    return craft_response({
        'status': True,
        'statusDescription': 'Successful',
        'points': member_points,
        'newDomain': domain,
        'isWhitelist': is_whitelist,
        'isBlacklist': is_blacklist
    }, 200)


@app.route('/ext/<user_id>/progress-full/', methods=['POST'])
@app.route('/ext/<user_id>/progress-full', methods=['POST'])
def ext_progress_full(user_id='John'):
    if user_id_is_invalid(user_id):
        return respond_error('Invalid user ID')

    user_details = mongo_db_communicator.query_one_from_collection_by_id('users', user_id)[1]
    room_details = mongo_db_communicator.query_one_from_collection_by_id('rooms', user_details['currentRoomID'])
    if not room_details[0]:
        return respond_error('Room not available')

    new_data = models.room.increase_member_points(room_details[1], user_id, POINTS_DIFF)
    mongo_db_communicator.update_one_in_collection_by_id('rooms', room_details[1]['_id'], new_data)
    room_details = mongo_db_communicator.query_one_from_collection_by_id('rooms', user_details['currentRoomID'])
    member_points = models.room.get_member_points(room_details[1], user_id)
    return craft_response({
        'status': True,
        'statusDescription': 'Successful',
        'points': member_points
    }, 200)


@app.route('/ext/<user_id>/progress-empty/', methods=['POST'])
@app.route('/ext/<user_id>/progress-empty', methods=['POST'])
def ext_progress_empty(user_id='John'):
    if user_id_is_invalid(user_id):
        return respond_error('Invalid user ID')

    user_details = mongo_db_communicator.query_one_from_collection_by_id('users', user_id)[1]
    room_details = mongo_db_communicator.query_one_from_collection_by_id('rooms', user_details['currentRoomID'])
    if not room_details[0]:
        return respond_error('Room not available')

    new_data = models.room.increase_member_points(room_details[1], user_id, -POINTS_DIFF)
    mongo_db_communicator.update_one_in_collection_by_id('rooms', room_details[1]['_id'], new_data)
    room_details = mongo_db_communicator.query_one_from_collection_by_id('rooms', user_details['currentRoomID'])
    member_points = models.room.get_member_points(room_details[1], user_id)
    return craft_response({
        'status': True,
        'statusDescription': 'Successful',
        'points': member_points
    }, 200)


# WEB APP - SHOP PAGE
@app.route('/app/<user_id>/shop/', methods=['GET'])
@app.route('/app/<user_id>/shop', methods=['GET'])
def app_shop(user_id='John'):
    if user_id_is_invalid(user_id):
        return respond_error('Invalid user ID')

    user_details = mongo_db_communicator.query_one_from_collection_by_id('users', user_id)[1]
    room_details = mongo_db_communicator.query_one_from_collection_by_id('rooms', user_details['currentRoomID'])
    if not room_details[0]:
        return respond_error('Room not available')

    points = models.room.get_member_points(room_details[1], user_id)
    number_of_shields = models.room.get_member_number_of_shields(room_details[1], user_id)
    profile_photo_url = models.user.get_profile_photo_url(user_details)
    room_name = models.room.get_name(room_details[1])

    return craft_response({
        'status': True,
        'statusDescription': 'Successful',
        'points': points,
        'numberOfShields': number_of_shields,
        'profilePhoto': profile_photo_url,
        'roomName': room_name
    }, 200)


# WEB APP - ROOM PAGE
@app.route('/app/<user_id>/room/', methods=['GET'])
@app.route('/app/<user_id>/room', methods=['GET'])
def app_room(user_id='John'):
    if user_id_is_invalid(user_id):
        return respond_error('Invalid user ID')

    user_details = mongo_db_communicator.query_one_from_collection_by_id('users', user_id)[1]
    room_details = mongo_db_communicator.query_one_from_collection_by_id('rooms', user_details['currentRoomID'])
    if not room_details[0]:
        return respond_error('Room not available')

    points = models.room.get_member_points(room_details[1], user_id)
    number_of_shields = models.room.get_member_number_of_shields(room_details[1], user_id)
    profile_photo_url = models.user.get_profile_photo_url(user_details)
    room_name = models.room.get_name(room_details[1])
    room_id = room_details[1]['_id']
    whitelist_domains = models.room.get_whitelist_domains(room_details[1])
    blacklist_domains = models.room.get_blacklist_domains(room_details[1])

    user_rooms = []
    all_rooms = mongo_db_communicator.query_multiple_from_collection('rooms', {})
    if not all_rooms[0]:
        return respond_error('Rooms not available')
    for room in all_rooms[1]:
        if models.room.member_is_in_room(room, user_id):
            to_add = {}
            to_add['roomName'] = models.room.get_name(room)
            to_add['roomID'] = room['_id']
            to_add['isUserActiveRoom'] = room['_id'] == room_id
            user_rooms.append(to_add)

    players_in_room = models.room.get_members(room_details[1])
    for player_in_room in players_in_room:
        player_details = mongo_db_communicator.query_one_from_collection_by_id('users', player_in_room['userID'])[1]
        print(player_details)
        player_profile_photo_url = models.user.get_profile_photo_url(player_details)
        player_in_room['profilePhoto'] = player_profile_photo_url

    return craft_response({
        'status': True,
        'statusDescription': 'Successful',
        'points': points,
        'numberOfShields': number_of_shields,
        'profilePhoto': profile_photo_url,
        'roomName': room_name,
        'roomID': room_id,
        'userRooms': user_rooms,
        'playersInRoom': players_in_room,
        'whitelistDomains': whitelist_domains,
        'blacklistDomains': blacklist_domains
    }, 200)


@app.route('/app/<user_id>/add-room/', methods=['POST'])
@app.route('/app/<user_id>/add-room', methods=['POST'])
def app_room_create_or_join(user_id='John'):
    expected_params = ['addType', 'value']
    if is_missing_params(request.get_json(), expected_params):
        return respond_error('Missing or invalid parameters')
    if user_id_is_invalid(user_id):
        return respond_error('Invalid user ID')

    add_type = request.get_json()['addType']
    value = request.get_json()['value']

    if add_type == 'create':
        random_number = random.randint(100000, 999999)
        while mongo_db_communicator.query_one_from_collection_by_id('rooms', random_number):
            random_number = random.randint(100000, 999999)
        room_details = {
            '_id': random_number,
            'name': value,
            'ownerUserID': user_id,
            'whitelistDomains': [],
            'blacklistDomains': [],
            'members': [
                {
                    'userID': user_id,
                    'points': 0,
                    'timeProgress': 0,
                    'numberOfShields': 0
                }
            ],
            'attackQueue': []
        }
        mongo_db_communicator.insert_to_collection('rooms', random_number, room_details)
        return craft_response({
            'status': True,
            'statusDescription': 'Successful'
        }, 200)
    else:
        user_details = mongo_db_communicator.query_one_from_collection_by_id('users', user_id)[1]
        room_details = mongo_db_communicator.query_one_from_collection_by_id('rooms', user_details['currentRoomID'])
        if not room_details[0]:
            return respond_error('Room not available')
        new_data = models.room.add_member_to_room(room_details[1], user_id)
        mongo_db_communicator.update_one_in_collection_by_id('rooms', room_details[1]['_id'], new_data)


@app.route('/app/<user_id>/add-to-whitelist/', methods=['POST'])
@app.route('/app/<user_id>/add-to-whitelist', methods=['POST'])
def app_add_to_whitelist(user_id='John'):
    expected_params = ['domains']
    if is_missing_params(request.get_json(), expected_params):
        return respond_error('Missing or invalid parameters')
    if user_id_is_invalid(user_id):
        return respond_error('Invalid user ID')

    user_details = mongo_db_communicator.query_one_from_collection_by_id('users', user_id)[1]
    room_details = mongo_db_communicator.query_one_from_collection_by_id('rooms', user_details['currentRoomID'])
    if not room_details[0]:
        return respond_error('Room not available')

    whitelist_domains = request.get_json()['domains']
    new_data = room_details[1]
    for whitelist_domain in whitelist_domains:
        new_data = models.room.add_to_whitelist_domains(new_data,
                                                        whitelist_domain)

    mongo_db_communicator.update_one_in_collection_by_id('rooms', room_details[1]['_id'], new_data)

    return craft_response({
        'status': True,
        'statusDescription': 'Successful'
    }, 200)


@app.route('/app/<user_id>/add-to-blacklist/', methods=['POST'])
@app.route('/app/<user_id>/add-to-blacklist', methods=['POST'])
def app_add_to_blacklist(user_id='John'):
    expected_params = ['domains']
    if is_missing_params(request.get_json(), expected_params):
        return respond_error('Missing or invalid parameters')
    if user_id_is_invalid(user_id):
        return respond_error('Invalid user ID')

    user_details = mongo_db_communicator.query_one_from_collection_by_id('users', user_id)[1]
    room_details = mongo_db_communicator.query_one_from_collection_by_id('rooms', user_details['currentRoomID'])
    if not room_details[0]:
        return respond_error('Room not available')

    blacklist_domains = request.get_json()['domains']
    new_data = room_details[1]
    for blacklist_domain in blacklist_domains:
        new_data = models.room.add_to_blacklist_domains(new_data,
                                                        blacklist_domain)

    mongo_db_communicator.update_one_in_collection_by_id('rooms', room_details[1]['_id'], new_data)

    return craft_response({
        'status': True,
        'statusDescription': 'Successful'
    }, 200)


if __name__ == '__main__':
    app.run()
