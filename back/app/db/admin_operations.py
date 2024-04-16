from bson.objectid import ObjectId

from werkzeug.security import generate_password_hash

from .client import db


class AdminOperations:
    @staticmethod
    def get_admins():
        admins_dict = {}

        result = db.admins.find({}, {'password': False})
        for index, item in enumerate(result):
            temp = {key: (str(value) if key == "_id" else value) for key, value in item.items()}
            admins_dict[index] = temp
        return admins_dict

    @staticmethod
    def add_admin(values):
        admin = {}
        for key, value in values.items():
            if key == 'password':
                password = generate_password_hash(value)
                admin[key] = password
                continue
            admin[key] = value

        db.admins.insert_one(admin)

    @staticmethod
    def delete_admin(_id):
        db.admins.delete_one({'_id': ObjectId(_id)})

    @staticmethod
    def update_admin(_id, values_dict):
        admin = {'_id': ObjectId(_id)}
        db.admins.update_one(admin, {'$set': values_dict})
