from bson.objectid import ObjectId

from werkzeug.security import generate_password_hash

from .client import db


class AdminOperations:
    @staticmethod
    def get_admins():
        admins_dict = {}

        result = db.admins.find({}, {'password': False})
        for index, item in enumerate(result):
            admins_dict[index] = {
                key: (str(value) if key == "_id" else value) for key, value in item.items()}
            
        return admins_dict

    @staticmethod
    def add_admin(values):
        values['password'] = generate_password_hash(values['password'])

        db.admins.insert_one(values)

    @staticmethod
    def delete_admin(_id):
        db.admins.delete_one({'_id': ObjectId(_id)})

    @staticmethod
    def update_admin(_id, values_dict):
        try:
            values_dict['password'] = generate_password_hash(values_dict['password'])
        except KeyError:
            pass
        
        db.admins.update_one(
            {'_id': ObjectId(_id)}, 
            {'$set': values_dict})
