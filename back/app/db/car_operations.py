from bson.objectid import ObjectId

import uuid

from ..modules.converter import convert, delete_storage

from .client import db
from ..modules.decorators import check_file_extension


class CarOperations:
    @staticmethod
    def get_cars():
        cars_dict = {}
        for index, item in enumerate(db.cars.find()):
            temp = {}
            for key, value in item.items():
                if key == '_id':
                    temp[key] = str(value)
                    continue
                temp[key] = value
            cars_dict[index] = temp
        return cars_dict

    @staticmethod
    def get_car(_id):
        car_dict = {}
        response = db.cars.find_one({'_id': ObjectId(_id)})

        for key, value in response.items():
            if key == '_id':
                car_dict[key] = str(value)
                continue
            car_dict[key] = value

        return car_dict

    @staticmethod
    @check_file_extension
    def add_new_car(values_dict, photos):
        folder_id = str(uuid.uuid4())

        values_dict['folder_id'] = folder_id

        for key, value in photos.items():
            values_dict[key] = convert(folder_id=folder_id, index=key, file=value)

        db.cars.insert_one(values_dict)

    @staticmethod
    def delete_car(_id):
        folder_id = db.cars.find_one({'_id': ObjectId(_id)})['folder_id']

        delete_storage(folder_id)
        db.cars.delete_one({'_id': ObjectId(_id)})

    @staticmethod
    @check_file_extension
    def update_car(_id, values_dict, photos):
        folder_id = db.cars.find_one({'_id': ObjectId(_id)})['folder_id']

        for key, value in photos.items():
            values_dict[key] = convert(folder_id=folder_id, index=key, file=value)

        db.cars.update_one(
            {'_id': ObjectId(_id)}, 
            {'$set': values_dict})
