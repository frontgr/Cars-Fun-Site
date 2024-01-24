import os


# Flask app
secret_key = os.environ['SECRET_KEY']
jwt_secret_key = os.environ['JWT_SECRET_KEY']

# Storage
storage = './app/storage'
extensions = {'png', 'jpg', 'jpeg', 'webp'}

# DataBase
host = os.environ['HOST']
port = int(os.environ['PORT'])

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
