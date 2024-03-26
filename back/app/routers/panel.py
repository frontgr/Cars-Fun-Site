from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, current_user

from app.models.cars import Cars
from app.routers.decorators_routers import admin_permission


panel = Blueprint('panel', __name__)


@panel.route('/panel/cars', methods=['GET'])
@jwt_required()
def panel_get_cars():
    return jsonify(Cars().get_cars()), 200


@panel.route('/panel/car', methods=['POST'])
@jwt_required()
@admin_permission(current_user, 'add_cars')
def add_car():
    values_dict = {i: request.form.get(i) for i in request.form}
    photos = {i: request.files.get(i) for i in request.files}

    Cars().add_new_car(values_dict=values_dict, photos=photos)
    return '', 201


@panel.route('/panel/car', methods=['DELETE'])
@jwt_required()
@admin_permission(current_user, 'delete_cars')
def delete_car():
    _id = request.args.get('_id')

    Cars().delete_car(_id)
    return '', 204


@panel.route('/panel/car', methods=['PUT'])
@jwt_required()
@admin_permission(current_user, 'edit_cars')
def update_car():
    _id = request.args.get('_id')
    values_dict = {i: request.form.get(i) for i in request.form if i != 'name'}
    photos = {i: request.files.get(i) for i in request.files}

    Cars().update_car(photos=photos,
                      _id=_id,
                      values_dict=values_dict)

    return '', 200
