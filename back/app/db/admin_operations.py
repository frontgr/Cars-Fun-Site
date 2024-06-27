from werkzeug.security import generate_password_hash

from .models import Admin


class AdminOperations:
    @staticmethod
    def get_admins():
        admins = {}

        for index, item in enumerate(Admin.objects.exclude('password')):
            admins[index] = item.to_mongo()
            
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
