from pymongo import MongoClient
from bson.objectid import ObjectId

from config import db_uri

client = MongoClient(db_uri)
db = client.cars_fun_site


class Admin:
    def __init__(self, login=None, id=None):
        # Determining based on which criteria we will conduct the search
        if id is not None:
            admin = db.admins.find_one({'_id': ObjectId(id)})
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
