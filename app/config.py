import os
from dotenv import load_dotenv

load_dotenv()

# Flask app
secret_key = os.getenv('SECRET_KEY')

# DataBase
host = os.getenv('HOST')
port = os.getenv('PORT')

db_uri = f"mongodb://{host}:{port}/"

