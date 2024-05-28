from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, current_user

from pymongo.errors import DuplicateKeyError

from ...db import AdminOperations

from ...modules.decorators import check_admin_permission


admins_panel = Blueprint('admins', __name__)


@admins_panel.route('/panel/admins', methods=['GET'])
@jwt_required()
def get_admins():
    return jsonify(AdminOperations.get_admins()), 200


@admins_panel.route('/panel/admin', methods=['POST'])
@jwt_required()
@check_admin_permission(current_user, 'add_users')
def add_admin():
    try:
        AdminOperations.add_admin(values={i: request.form.get(i) for i in request.form})
        
        response = jsonify({"msg": "The admin was successfully created"})
        return response, 201
    except KeyError:
        response = jsonify({"msg": "The password field was not received"})
        return response, 400
    except DuplicateKeyError:
        response = jsonify({"msg": "An admin with this username already exists"})
        return response, 400


@admins_panel.route('/panel/admin', methods=['DELETE'])
@jwt_required()
@check_admin_permission(current_user, 'delete_users')
def delete_admin():
    AdminOperations.delete_admin(_id=request.args.get('_id'))

    response = jsonify({"msg": "The admin was successfully deleted"})
    return response, 204


@admins_panel.route('/panel/admin', methods=['PUT'])
@jwt_required()
@check_admin_permission(current_user, 'edit_users')
def update_admin():
    AdminOperations.update_admin(_id=request.args.get('_id'), 
                                values_dict={i: request.form.get(i) for i in request.form})
    
    response = jsonify({"msg": "The admin's data was successfully updated"})
    return response, 200
