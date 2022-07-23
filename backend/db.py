import urllib.parse
from typing import Any, Tuple, List

import pymongo
from pymongo import MongoClient


class MongoDBCommunicator:
    def __init__(self, username: str, password: str, url: str):
        self.username = urllib.parse.quote_plus(username)
        self.password = urllib.parse.quote_plus(password)
        self.client = MongoClient(f'mongodb+srv://{self.username}:{self.password}@{url}')
        self.db = self.client.get_database('user_db')

    def get_all_collections(self) -> list:
        return self.db.list_collection_names()

    def get_collection(self, collection_name: str):
        return self.db[collection_name]

    def get_id_from_collection(self, collection_name: str, filter_dict: dict) -> Tuple[bool, Any]:
        item = self.db[collection_name].find_one(filter_dict)
        if item is None:
            return False, None
        return True, item['_id']

    def query_one_from_collection(self, collection_name: str, filter_dict: dict) -> Tuple[bool, dict]:
        item = self.db[collection_name].find_one(filter_dict)
        if item is None:
            return False, {}
        return True, dict(item)

    def query_one_from_collection_by_id(self, collection_name: str, identifier: Any) -> Tuple[bool, dict]:
        return self.query_one_from_collection(collection_name, {'_id': identifier})

    def query_multiple_from_collection(self, collection_name: str, filter_dict: dict) -> Tuple[bool, List[dict]]:
        result = []
        for item in self.db[collection_name].find(filter_dict):
            result.append(item)
        return True, result

    def insert_to_collection(self, collection_name: str, identifier: Any, data: dict) -> bool:
        data_to_commit = data.copy()
        data_to_commit['_id'] = identifier
        try:
            self.db[collection_name].insert_one(data_to_commit)
            return True
        except pymongo.errors.DuplicateKeyError:
            return False

    def update_one_in_collection_by_id(self, collection_name: str, identifier: Any, data: dict) -> bool:
        try:
            self.db[collection_name].update_one({'_id': identifier}, {'$set': data})
            return True
        except pymongo.errors.DuplicateKeyError:
            return False

    def delete_one_from_collection_by_id(self, collection_name: str, identifier: Any) -> bool:
        try:
            self.db[collection_name].delete_one({'_id': identifier})
            return True
        except pymongo.errors.DuplicateKeyError:
            return False
