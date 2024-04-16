from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, current_user

from ...db import CarOperations
from ...modules.decorators import check_admin_permission


cars_panel = Blueprint('panel', __name__)


@cars_panel.route('/panel/cars', methods=['GET'])
@jwt_required()
def panel_get_cars():
    return jsonify(CarOperations.get_cars()), 200


@cars_panel.route('/panel/car', methods=['POST'])
@jwt_required()
@check_admin_permission(current_user, 'add_cars')
def add_car():
    values_dict = {i: request.form.get(i) for i in request.form}
    photos = {i: request.files.get(i) for i in request.files}

    CarOperations.add_new_car(values_dict=values_dict, photos=photos)
    return '', 201


@cars_panel.route('/panel/car', methods=['DELETE'])
@jwt_required()
@check_admin_permission(current_user, 'delete_cars')
def delete_car():
    _id = request.args.get('_id')

    CarOperations.delete_car(_id)
    return '', 204


@cars_panel.route('/panel/car', methods=['PUT'])
@jwt_required()
@check_admin_permission(current_user, 'edit_cars')
def update_car():
    _id = request.args.get('_id')
    values_dict = {i: request.form.get(i) for i in request.form if i != 'name'}
    photos = {i: request.files.get(i) for i in request.files}

    CarOperations.update_car(photos=photos,
                             _id=_id,
                             values_dict=values_dict)

    return '', 200
