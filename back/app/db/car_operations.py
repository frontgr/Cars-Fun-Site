from bson.objectid import ObjectId

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
    def add_new_car(photos, values_dict):
        car = {key: value for key, value in values_dict.items()}

        car['cover_photo'] = convert(filename=car.get('name'),
                                     index='cover_photo',
                                     file=photos.pop('cover_photo'))

        car['photos'] = {key: convert(filename=car['name'], index=key, file=value)
                         for key, value in photos.items()}

        db.cars.insert_one(car)

    @staticmethod
    def delete_car(_id):
        name = db.cars.find_one({'_id': ObjectId(_id)})['name']
        delete_storage(name)
        db.cars.delete_one({'_id': ObjectId(_id)})

    @staticmethod
    @check_file_extension
    def update_car(photos, _id, values_dict):
        name = db.cars.find_one({'_id': ObjectId(_id)})['name']
        update = {key: value for key, value in values_dict.items()}

        for key, value in photos.items():
            update[key] = convert(name, key, value)

        car = {'_id': ObjectId(_id)}
        db.cars.update_one(car, {'$set': update})
