from werkzeug.security import check_password_hash

from .models import Admin

from werkzeug.security import generate_password_hash


class CurrentAdmin:
    def __init__(self, login=None, id=None):
        # Determining based on which criteria we will conduct the search
        if id:
            self.admin = Admin.objects(id=id).first()
        else:
            self.admin = Admin.objects(login=login).first()

    def data_validation(self, password):
        if self.admin is None:
            return False
        return check_password_hash(self.admin.password, password)

    def get_id(self):
        return str(self.admin.id)

    def check_permission(self, requested_permission):
        admin = self.admin.to_mongo()
        return admin[requested_permission]
