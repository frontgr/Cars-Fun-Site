from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, current_user

from mongoengine.errors import NotUniqueError, FieldDoesNotExist

from ...db import AdminOperations

from ...modules.decorators import check_admin_permission, unavailable_fields_exception


admins_panel = Blueprint('admins', __name__)


@admins_panel.route('/panel/admins', methods=['GET'])
@jwt_required()
def get_admins():
    return jsonify(AdminOperations.get_admins()), 200


@admins_panel.route('/panel/admin', methods=['POST'])
@jwt_required()
@check_admin_permission(current_user, 'add_users')
@unavailable_fields_exception
def add_admin():
    try:
        AdminOperations.add_admin(values={key: value == 'True' if not 'login' or 'password' else value 
                                          for key, value in request.form.items()})
        
        response = jsonify({"msg": "The admin was successfully created"})
        return response, 201
    except KeyError:
        response = jsonify({"msg": "The password field was not received"})
        return response, 400
    except NotUniqueError:
        response = jsonify({"msg": "An admin with this username already exists"})
        return response, 400


@admins_panel.route('/panel/admin', methods=['DELETE'])
@jwt_required()
@check_admin_permission(current_user, 'delete_users')
def delete_admin():
    AdminOperations.delete_admin(id=request.args.get('id'))

    response = jsonify({"msg": "The admin was successfully deleted"})
    return response, 204


@admins_panel.route('/panel/admin', methods=['PUT'])
@jwt_required()
@check_admin_permission(current_user, 'edit_users')
@unavailable_fields_exception
def update_admin():
    AdminOperations.update_admin(id=request.args.get('id'), 
                                values_dict={key: value == 'True' if not 'login' or 'password' else value 
                                             for key, value in request.form.items()})
    response = jsonify({"msg": "The admin's data was successfully updated"})
    return response, 200
