import logging
from pymongo import MongoClient
from werkzeug.security import generate_password_hash

from app.config import db_uri

logging.basicConfig(level=logging.INFO)

client = MongoClient(db_uri)
db = client.cars_fun_site

add_admin_fields = {'login',
                    'password',
                    'add_users',
                    'edit_users',
                    'delete_users',
                    'add_cars',
                    'edit_cars',
                    'delete_cars'}


logging.info('Скрипт запущен')
if db.admins.estimated_document_count() == 0:
    login = input('Write user name: ')
    password_hash = generate_password_hash(input('Write password: '))

    admin = {}
    for field in add_admin_fields:
        if field == 'login':
            db.admins.create_index([('login', 1)], unique=True)
            admin[field] = login
            continue
        if field == 'password':
            admin[field] = password_hash
            continue
        admin[field] = 'True'

    db.admins.insert_one(admin)
    logging.info('Данные были успешно добавлены')

else:
    logging.error('Коллекция уже содержет данные о админе')
