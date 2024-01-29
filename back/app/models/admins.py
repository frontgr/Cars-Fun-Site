from bson.objectid import ObjectId

from werkzeug.security import generate_password_hash

from .client import db


class Admins:
    def get_admins(self):
        admins_dict = {}
        for index, item in enumerate(db.admins.find()):
            temp = {}
            for key, value in item.items():
                if key == '_id':
                    temp[key] = str(value)
                    continue
                temp[key] = value
            admins_dict[index] = temp
        return admins_dict

    def add_admin(self, values):
        admin = {}
        for key, value in values.items():
            if key == 'password':
                password = generate_password_hash(value)
                admin[key] = password
                continue
            admin[key] = value

        db.admins.insert_one(admin)
        return {'status': 'ok'}

    def delete_admin(self, _id):
        db.admins.delete_one({'_id': ObjectId(_id)})

        return {'status': 'ok'}

    def update_admin(self, _id, values_dict):
        admin = {'_id': ObjectId(_id)}
        db.admins.update_one(admin, {'$set': values_dict})

        return {'status': 'ok'}
