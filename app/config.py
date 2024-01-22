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

# Models
add_admin_fields = {'login',
                    'password',
                    'add_users',
                    'edit_users',
                    'delete_users',
                    'add_cars',
                    'edit_cars',
                    'delete_cars'}
update_admin_fields = {'_id',
                       'add_users',
                       'edit_users',
                       'delete_users',
                       'add_cars',
                       'edit_cars',
                       'delete_cars'}

add_car_fields = {'name',
                  'number',
                  'type',
                  'speed_up',
                  'max_speed',
                  'description',
                  }
update_car_fields = {'_id',
                     'number',
                     'type',
                     'speed_up',
                     'max_speed',
                     'description',
                     }
