from pymongo import MongoClient

from back.app.config import db_uri


client = MongoClient(db_uri)
db = client.cars_fun_site
