from bson.objectid import ObjectId

from .client import db


class Admin:
    def __init__(self, login=None, _id=None):
        # Determining based on which criteria we will conduct the search
        if _id is not None:
            admin = db.admins.find_one({'_id': ObjectId(_id)})
        else:
            admin = db.admins.find_one({"login": login})

        # Checking if we can retrieve the data
        try:
            self.id = str(admin.get('_id'))
            self.login = admin.get('login')
            self.password = admin.get('password')
            self.authenticated = admin.get('authenticated')

        # If not, setting all values to None
        except:
            self.id = self.login = self.password = self.authenticated = None

    def is_active(self):
        return True

    def get_id(self):
        return self.id

    def is_authenticated(self):
        return self.authenticated

    def is_anonymous(self):
        return False

    def is_authenticated_update(self, status):
        db.admins.update_one({"_id": self.id},
                             {"$set": {"authenticated": status}})
