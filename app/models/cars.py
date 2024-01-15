from bson.objectid import ObjectId

from app.converter import convert, allowed_file
from app.storage import delete_storage
from .client import db


class Cars:
    def get_cars(self):
        f = {}
        for index, item in enumerate(db.cars.find()):
            temp = {'_id': str(item['_id']),
                    'name': item['name'],
                    'number': item['number'],
                    'car_type': item['car_type'],
                    'speed_up': item['speed_up'],
                    'max_speed': item['max_speed'],
                    'cover_photo': item['cover_photo'],
                    'photos': item['photos']}

            f[index] = temp
        return f

    @allowed_file
    def add_new_car(self, photos, name, number, car_type, speed_up, max_speed):
        cover_photo = ''
        if 'cover_photo' in photos:
            cover_photo = convert(name, 'cover_photo', photos.pop('cover_photo'))

        photos_dict = {}
        for photo in photos.items():
            photos_dict[photo[0]] = convert(name, photo[0], photo[1])

        car = {
            'name': name,
            'number': number,
            'car_type': car_type,
            'speed_up': speed_up,
            'max_speed': max_speed,
            'cover_photo': cover_photo,
            'photos': photos_dict
        }

        db.cars.insert_one(car)

        return {'status': 'ok'}

    def delete_car(self, _id):
        name = db.cars.find_one({'_id': ObjectId(_id)})['name']
        delete_storage(name)
        db.cars.delete_one({'_id': ObjectId(_id)})

        return {'status': 'ok'}

    @allowed_file
    def update_car(self, photos, values_dict):
        _id = values_dict.pop('_id')
        name = db.cars.find_one({'_id': ObjectId(_id)})['name']
        update = {}

        for item in values_dict.items():
            update[item[0]] = item[1]

        for item in photos.items():
            update[item[0]] = convert(name, item[0], item[1])

        car = {'_id': ObjectId(_id)}
        db.cars.update_one(car, {'$set': update})

        return {'status': 'ok'}
