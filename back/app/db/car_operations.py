import re
import uuid

from ..modules.converter import convert, delete_storage

from .models import Cars
from ..modules.decorators import check_file_extension


class CarOperations:
    @staticmethod
    def get_public_cars():
        cars = {}
        for index, item in enumerate(Cars.objects(is_hidden=False).exclude('id')):
            cars[index] = item.to_mongo()
        return cars

    @staticmethod
    def get_panel_cars():
        cars = {}
        for index, item in enumerate(Cars.objects()):
            car = {}
            for key, value in item.to_mongo().items():
                if key == '_id':
                    car['id'] = str(value)
                    continue
                car[key] = value
            cars[index] = car
        return cars

    @staticmethod
    def get_car(id):
        car = Cars.objects(id=id).first().to_mongo()
        car['id'] = str(car.pop('_id'))
        return car

    @staticmethod
    @check_file_extension
    def add_new_car(values_dict, photos):
        folder_id = str(uuid.uuid4())

        values_dict['folder_id'] = folder_id

        for key, value in photos.items():
            counter = 0
            if key == 'cover_photo':
                values_dict['cover_photo'] = convert(folder_id=folder_id, index=key, file=value)
            if key == 'photos':
                converted_photos = []
                for photo in value:
                    converted_photos.append(convert(folder_id=folder_id, index='photo_' + str(counter), file=photo))
                    counter += 1
                values_dict['photos'] = converted_photos
                
        car = Cars(**values_dict)
        car.save()

    @staticmethod
    def delete_car(id):
        folder_id = Cars.objects(id=id).first().folder_id

        delete_storage(folder_id)
        Cars.objects(id=id).delete()

    @staticmethod
    @check_file_extension
    def update_car(id, values_dict, photos):
        folder_id = Cars.objects(id=id).first().folder_id

        for key, value in photos.items():
            values_dict[key] = convert(folder_id=folder_id, index=key, file=value)

        Cars.objects(id=id).modify(**values_dict)
