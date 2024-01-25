from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, set_access_cookies

from back.app.models.admin import Admin

auth = Blueprint('auth', __name__)


@auth.route('/login', methods=['POST'])
def login_post():
    login = request.form.get('login')
    password = request.form.get('password')

    admin = Admin(login)

    if admin.data_validation(password) is False:
        return {'status': 'Error'}

    response_data = jsonify({"msg": "login successful"})
    access_token = create_access_token(identity=admin.get_id())
    set_access_cookies(response_data, access_token)

    return response_data
