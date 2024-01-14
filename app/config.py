import os
from dotenv import load_dotenv

load_dotenv()

# Flask app
secret_key = os.getenv('SECRET_KEY')

# Storage
storage = './app/storage'
extensions = {'png', 'jpg', 'jpeg'}

# DataBase
host = os.getenv('HOST')
port = os.getenv('PORT')

db_uri = f"mongodb://{host}:{port}/"

