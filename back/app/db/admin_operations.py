from werkzeug.security import generate_password_hash

from .models import Admin


class AdminOperations:
    @staticmethod
    def create_root_admin(root_login, root_password):
        if not Admin.objects.first():
            root_admin = Admin(
                            login=root_login,
                            password=generate_password_hash(root_password),
                            add_users = True,
                            edit_users = True,
                            delete_users = True,
                            add_cars = True,
                            edit_cars = True,
                            delete_cars = True,
                        )
            root_admin.save()

    @staticmethod
    def get_admins():
        admins = {}

        for index, item in enumerate(Admin.objects.exclude('password')):
            admin = {}
            for key, value in item.to_mongo().items():
                if key == '_id':
                    admin['id'] = str(value)
                    continue
                admin[key] = value
            admins[index] = admin
            
        return admins

    @staticmethod
    def add_admin(values):
        values['password'] = generate_password_hash(values['password'])

        Admin(**values).save()

    @staticmethod
    def delete_admin(id):
        Admin.objects(id=id).delete()

    @staticmethod
    def update_admin(id, values_dict):
        try:
            values_dict['password'] = generate_password_hash(values_dict['password'])
        except KeyError:
            pass
        
        Admin.objects(id=id).modify(**values_dict)
