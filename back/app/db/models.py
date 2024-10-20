import uuid

import mongoengine 
from mongoengine import Document
from mongoengine import StringField, BooleanField, ListField, URLField, IntField

from ..config import db_uri


mongoengine.connect(host=db_uri, db='Cars-Funs-Site')


class Admin(Document):
    login = StringField(max_length=50, required=True, unique=True)
    password = StringField(required=True)
    add_users = BooleanField(default=False)
    edit_users = BooleanField(default=False)
    delete_users = BooleanField(default=False)
    add_cars = BooleanField(default=False)
    edit_cars = BooleanField(default=False)
    delete_cars = BooleanField(default=False)
    

class Cars(Document):
    name = StringField()
    is_hidden= BooleanField(default=False)
    number = IntField()
    type = StringField()
    speed_up = IntField(default=0)
    max_speed = IntField(default=0)
    description = StringField()
    folder_id = StringField()
    cover_photo = StringField()
    photos = ListField(max_length=20)
    