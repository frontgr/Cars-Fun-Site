from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, current_user

from ...db import CarOperations
from ...modules.decorators import check_admin_permission, unavailable_fields_exception


cars_panel = Blueprint('panel', __name__)


@cars_panel.route('/panel/cars', methods=['GET'])
@jwt_required()
def panel_get_cars():
    return jsonify(CarOperations.get_panel_cars()), 200


@cars_panel.route('/panel/car', methods=['POST'])
@jwt_required()
@check_admin_permission(current_user, 'add_cars')
@unavailable_fields_exception
def add_car():
    values_dict={i: request.form.get(i) for i in request.form}
    photos = {
        'cover_photo': request.files.get('cover_photo', None),
        'photos': request.files.getlist('photos')
    }

    CarOperations.add_new_car(values_dict, photos)

    response = jsonify({"msg": "The record was successfully added", "values": str(values_dict)})
    return response, 201


@cars_panel.route('/panel/car', methods=['DELETE'])
@jwt_required()
@check_admin_permission(current_user, 'delete_cars')
def delete_car():
    CarOperations.delete_car(id=request.args.get('id'))

    response = jsonify({"msg": "The record was successfully deleted"})
    return response, 204


@cars_panel.route('/panel/car', methods=['PUT'])
@jwt_required()
@check_admin_permission(current_user, 'edit_cars')
@unavailable_fields_exception
def update_car():
    CarOperations.update_car(
        id=request.args.get('id'),
        values_dict= {i: request.form.get(i) for i in request.form},
        photos={i: request.files.get(i) for i in request.files})
    
    response = jsonify({"msg": "The record data was successfully updated"})
    return response, 200
