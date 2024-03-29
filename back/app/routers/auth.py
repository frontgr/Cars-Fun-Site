from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, set_access_cookies
from flask_wtf.csrf import generate_csrf

from app.models.admin import Admin


auth = Blueprint('auth', __name__)


@auth.route('/login', methods=['POST'])
def login_post():
    login = request.form.get('login')
    password = request.form.get('password')

    try:
        admin = Admin(login)

        if admin.data_validation(password) is False:
            return jsonify({"msg": "The data did not pass validation"}), 400
    except AttributeError:
        return '', 400

    response_data = jsonify({"msg": "Login successful"})
    access_token = create_access_token(identity=admin.get_id())
    csrf_token = generate_csrf()

    set_access_cookies(response_data, access_token)
    response_data.set_cookie('csrf_access_token', csrf_token)

    return response_data
