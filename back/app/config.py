import os


# Flask app
secret_key = os.environ['SECRET_KEY']
jwt_secret_key = os.environ['JWT_SECRET_KEY']

# Storage
storage = '/Cars-Fun-Site/photo'
extensions = {'png', 'jpg', 'jpeg', 'webp'}

# DataBase
db_uri = os.environ['DB_URI']
