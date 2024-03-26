import os


# Flask app
secret_key = os.environ['SECRET_KEY']
jwt_secret_key = os.environ['JWT_SECRET_KEY']

# Storage
storage = './storage'
extensions = {'png', 'jpg', 'jpeg', 'webp'}

# DataBase
db_uri = os.environ['DB_URI']

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
