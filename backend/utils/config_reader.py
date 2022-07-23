import json

FILE_NAME = 'config.json'


def exists(key: str) -> bool:
    with open(FILE_NAME) as config_file:
        return key in json.load(config_file)


def get_value(key: str):
    with open(FILE_NAME) as config_file:
        json_dict = json.load(config_file)
        return json_dict[key] if key in json_dict else ''
