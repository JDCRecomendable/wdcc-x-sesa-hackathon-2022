"""
item.py
Copyright (c) 2022 Jared Daniel Recomendable.
Licensed under the MIT Licence.

Sample `item` object:
{
    "_id": 1,
    "name": "Memes",
    "cost": 50,
    "type": 1
}
"""


def get_name(item_data: dict) -> str:
    return item_data['name']


def get_cost(item_data: dict) -> int:
    return item_data['cost']


def get_type(item_data: dict) -> int:
    return item_data['type']
