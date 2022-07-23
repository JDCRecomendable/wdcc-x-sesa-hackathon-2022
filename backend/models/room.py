"""
room.py
Copyright (c) 2022 Jared Daniel Recomendable.
Licensed under the MIT Licence.

Sample `room` object:
{
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
            "isSuccessful": false,
            "completed": false
        }
    ]
}
"""
from typing import List


def get_name(room_item: dict) -> str:
    return room_item['name']


def get_owner_user_id(room_item: dict) -> str:
    return room_item['ownerUserID']


def is_whitelist_domain(room_item: dict, domain: str) -> bool:
    whitelist_domains = room_item['whitelistDomains']
    return domain in whitelist_domains


def is_blacklist_domain(room_item: dict, domain: str) -> bool:
    blacklist_domains = room_item['blacklistDomains']
    return domain in blacklist_domains


def get_member_user_ids(room_item: dict) -> List[str]:
    member_user_ids = []
    members_object = room_item['members']
    for member_object in members_object:
        member_user_ids.append(member_object['userID'])
    return member_user_ids


def get_members(room_item: dict) -> List[dict]:
    members_object = room_item['members']
    return members_object


def member_is_in_room(room_item: dict, member_user_id: str) -> bool:
    member_user_ids = get_member_user_ids(room_item)
    return member_user_id in member_user_ids


def get_member_details(room_item: dict, member_user_id: str) -> dict:
    members_object = room_item['members']
    for member_object in members_object:
        if member_user_id == member_object['userID']:
            return member_object
    return {}


def get_member_points(room_item: dict, member_user_id: str) -> int:
    member_details = get_member_details(room_item, member_user_id)
    if member_details != {}:
        return member_details['points']
    return -1


def get_member_time_progress(room_item: dict, member_user_id: str) -> int:
    member_details = get_member_details(room_item, member_user_id)
    if member_details != {}:
        return member_details['timeProgress']
    return -1


def get_member_number_of_shields(room_item: dict, member_user_id: str) -> int:
    member_details = get_member_details(room_item, member_user_id)
    if member_details != {}:
        return member_details['numberOfShields']
    return -1


def get_attack_queue(room_item: dict) -> List[dict]:
    return room_item['attackQueue']


def _get_attack_queue_for_specific_user(room_item: dict, user_id: str, user_type: str) -> List[dict]:
    attack_queue = get_attack_queue(room_item)
    specific_attacks = []
    for attack_object in attack_queue:
        if attack_object[user_type] == user_id:
            specific_attacks.append(attack_object)
    return specific_attacks


def get_attack_queue_for_src_user(room_item: dict, src_user_id: str) -> List[dict]:
    return _get_attack_queue_for_specific_user(room_item, src_user_id, 'srcUserID')


def get_attack_queue_for_tgt_user(room_item: dict, tgt_user_id: str) -> List[dict]:
    return _get_attack_queue_for_specific_user(room_item, tgt_user_id, 'tgtUserID')


def _get_specific_attacks_for_specific_user(room_item: dict,
                                            user_id: str,
                                            user_type: str,
                                            attribute: str) -> List[dict]:
    attack_queue = get_attack_queue(room_item)
    specific_attacks = []
    for attack_object in attack_queue:
        if attack_object[user_type] == user_id and attack_object[attribute]:
            specific_attacks.append(attack_object)
    return specific_attacks


def _get_specific_attacks_for_specific_user_attribute_inverted(room_item: dict,
                                                               user_id: str,
                                                               user_type: str,
                                                               attribute: str) -> List[dict]:
    attack_queue = get_attack_queue(room_item)
    specific_attacks = []
    for attack_object in attack_queue:
        if attack_object[user_type] == user_id and not attack_object[attribute]:
            specific_attacks.append(attack_object)
    return specific_attacks


def get_pending_attacks_for_src_user(room_item: dict, src_user_id: str) -> List[dict]:
    return _get_specific_attacks_for_specific_user_attribute_inverted(room_item, src_user_id, 'srcUserID', 'completed')


def get_pending_attacks_for_tgt_user(room_item: dict, tgt_user_id: str) -> List[dict]:
    return _get_specific_attacks_for_specific_user_attribute_inverted(room_item, tgt_user_id, 'tgtUserID', 'completed')


def get_successful_attacks_for_src_user(room_item: dict, src_user_id: str) -> List[dict]:
    return _get_specific_attacks_for_specific_user(room_item, src_user_id, 'srcUserID', 'isSuccessful')


def get_successful_attacks_for_tgt_user(room_item: dict, tgt_user_id: str) -> List[dict]:
    return _get_specific_attacks_for_specific_user(room_item, tgt_user_id, 'tgtUserID', 'isSuccessful')


def add_to_attack_queue(room_item: dict, src_user_id: str, tgt_user_id: str, attack_id: int) -> dict:
    attack_queue = get_attack_queue(room_item)
    attack_queue.append({
        'srcUserID': src_user_id,
        'tgtUserID': tgt_user_id,
        'attackID': attack_id,
        'completed': False,
        'isSuccessful': False
    })
    return room_item


def increase_member_points(room_item: dict, member_user_id: str, points: int) -> dict:
    member_details = get_member_details(room_item, member_user_id)
    member_details['points'] += points
    return room_item
