"""
user.py
Copyright (c) 2022 Jared Daniel Recomendable.
Licensed under the MIT Licence.

Sample `user` object:
{
    "_id": "John",
    "pw": "abc123",
    "currentRoomID": 1,
    "profilePhoto": "https://google.com"
}
"""


def get_current_room(user_data: dict) -> int:
    return user_data['currentRoomID']


def get_profile_photo_url(user_data: dict) -> str:
    return user_data['profilePhoto']


def update_current_room(user_data: dict, new_room_id: int):
    user_data['currentRoomID'] = new_room_id
