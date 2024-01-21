from flask import Blueprint, request
from flask_jwt_extended import create_access_token

from app.models.admin import Admin

auth = Blueprint('auth', __name__)


@auth.route('/login', methods=['POST'])
def login_post():
    login = request.form.get('login')
    password = request.form.get('password')

    admin = Admin(login)

    if admin.data_validation(password) is False:
        return {'status': 'Error'}

    token = create_access_token(identity=admin.get_id())
    return {'status': 'ok', 'access_token': token}
