from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, set_access_cookies

from ..db import CurrentAdmin


auth = Blueprint('auth', __name__)


@auth.route('/login', methods=['POST'])
def login_post():
    login = request.form.get('login')
    password = request.form.get('password')

    admin = CurrentAdmin(login=login)

    if admin.data_validation(password) is False:
        return jsonify({"msg": "An admin with these credentials does not exist or the data did not pass validation"}), 400

    access_token = create_access_token(identity=admin.get_id())
    response = jsonify({"msg": "Login successful", "access_token": access_token})

    return response
