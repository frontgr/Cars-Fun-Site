import os
from dotenv import load_dotenv

load_dotenv()

# Flask app
secret_key = os.getenv('SECRET_KEY')
jwt_secret_key = os.getenv('JWT_SECRET_KEY')

# Storage
storage = './app/storage'
extensions = {'png', 'jpg', 'jpeg', 'webp'}

# DataBase
host = os.getenv('HOST')
port = os.getenv('PORT')

db_uri = f"mongodb://{host}:{port}/"

