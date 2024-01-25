from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, current_user

from back.app.models.admins import Admins
from back.app.config import add_admin_fields, update_admin_fields

from .decorators_routers import admin_permission


admins = Blueprint('admins', __name__)


@admins.route('/panel/admins', methods=['POST'])
@jwt_required()
def admins_post():
    return jsonify(Admins().get_admins())


@admins.route('/panel/add_admin', methods=['POST'])
@jwt_required()
@admin_permission(current_user, 'add_users')
def admins_add_post():
    input_fields = {i for i in request.form}

    if input_fields in add_admin_fields:
        values_dict = {i: request.form.get(i) for i in request.form if i in add_admin_fields}

        response = Admins().add_admin(values=values_dict)
        return response

    else:
        return {'status': 'Error',
                'message': 'Not all fields are filled or an unexpected value has been passed'}


@admins.route('/panel/delete_admin', methods=['DELETE'])
@jwt_required()
@admin_permission(current_user, 'delete_users')
def delete_admin():
    _id = request.args.get('_id')

    response = Admins().delete_admin(_id)
    return response


@admins.route('/panel/update_admin', methods=['POST'])
@jwt_required()
@admin_permission(current_user, 'edit_users')
def admin_update_post():
    input_fields = {i for i in request.form}

    if input_fields in update_admin_fields:
        _id = request.args.get('_id')
        values = {i: request.form.get(i) for i in request.form if i != 'password'}

        response = Admins().update_admin(_id=_id,
                                         values_dict=values)
        return response

    else:
        return {'status': 'Error',
                'message': 'Not all fields are filled or an unexpected value has been passed'}
