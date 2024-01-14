from flask import Blueprint, request, flash
from werkzeug.security import check_password_hash
from flask_login import login_user

from app.models.admin import Admin

auth = Blueprint('auth', __name__)


@auth.route('/login', methods=['POST'])
def login_post():
    login = request.form.get('login')
    password = request.form.get('password')

    admin = Admin(login)

    if admin.login is None or check_password_hash(admin.password, password) is False:
        return {'status': 'Error'}

    admin.is_authenticated_update(True)
    login_user(admin)
    return {'status': 'ok'}
