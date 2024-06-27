import os

# Flask app
secret_key = os.environ['SECRET_KEY']
jwt_secret_key = os.environ['JWT_SECRET_KEY']

# Storage
storage = '/Cars-Fun-Site/photo'
extensions = {'png', 'jpg', 'jpeg', 'webp'}

# DataBase
db_uri = os.environ['DB_URI']

#Root admin data
root_admin_login = os.environ['ROOT_LOGIN']
root_admin_password = os.environ['ROOT_PASSWORD']
