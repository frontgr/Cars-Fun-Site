from flask import Blueprint, request, jsonify, Response
from flask_jwt_extended import jwt_required, current_user

from app.models.admins import Admins
from app.config import add_admin_fields, update_admin_fields

from .decorators_routers import admin_permission


admins = Blueprint('admins', __name__)


@admins.route('/panel/admins', methods=['GET'])
@jwt_required()
def get_admins():
    return jsonify(Admins().get_admins()), 200


@admins.route('/panel/admin', methods=['POST'])
@jwt_required()
@admin_permission(current_user, 'add_users')
def add_admin():
    input_fields = {i for i in request.form}

    if input_fields in add_admin_fields:
        values_dict = {i: request.form.get(i) for i in request.form if i in add_admin_fields}

        Admins().add_admin(values=values_dict)
        return '', 201

    else:
        response = jsonify({"msg": "Not all fields are filled or an unexpected value has been passed"})
        return response, 400


@admins.route('/panel/admin', methods=['DELETE'])
@jwt_required()
@admin_permission(current_user, 'delete_users')
def delete_admin():
    _id = request.args.get('_id')

    Admins().delete_admin(_id)
    return '', 204


@admins.route('/panel/admin', methods=['PUT'])
@jwt_required()
@admin_permission(current_user, 'edit_users')
def update_admin():
    input_fields = {i for i in request.form}

    if input_fields in update_admin_fields:
        _id = request.args.get('_id')
        values = {i: request.form.get(i) for i in request.form if i != 'password'}

        Admins().update_admin(_id=_id, values_dict=values)
        return '', 200

    else:
        response = jsonify({"msg": "Not all fields are filled or an unexpected value has been passed"})
        return response, 400
