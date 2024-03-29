from bson.objectid import ObjectId

from werkzeug.security import check_password_hash

from .client import db


class Admin:
    def __init__(self, login=None, _id=None):
        # Determining based on which criteria we will conduct the search
        if _id is not None:
            self.admin = db.admins.find_one({'_id': ObjectId(_id)})
        else:
            self.admin = db.admins.find_one({"login": login})

    def data_validation(self, password):
        if self.admin is None:
            return False
        return check_password_hash(self.admin.get('password'), password)

    def get_id(self):
        return str(self.admin.get('_id'))

    def check_permission(self, requested_permission):
        return self.admin.get(requested_permission)

    def get_info(self):
        return self.admin.get('permission')
