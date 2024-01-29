from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, current_user

from app.models.cars import Cars
from app.routers.decorators_routers import admin_permission
from app.config import add_car_fields


panel = Blueprint('panel', __name__)


@panel.route('/panel', methods=['POST'])
@jwt_required()
def panel_post():
    return jsonify(Cars().get_cars())


@panel.route('/panel/add_car', methods=['POST'])
@jwt_required()
@admin_permission(current_user, 'add_cars')
def panel_add_post():
    input_fields = {i for i in request.form}

    if input_fields in add_car_fields:
        values_dict = {i: request.form.get(i) for i in request.form}
        photos = {i: request.files.get(i) for i in request.files}

        response = Cars().add_new_car(values_dict=values_dict,
                                      photos=photos)
        return response
    else:
        return {'status': 'Error',
                'message': 'Not all fields are filled or an unexpected value has been passed'}


@panel.route('/panel/delete_car', methods=['DELETE'])
@jwt_required()
@admin_permission(current_user, 'delete_cars')
def panel_delete():
    _id = request.args.get('_id')

    response = Cars().delete_car(_id)
    return response


@panel.route('/panel/update_car', methods=['POST'])
@jwt_required()
@admin_permission(current_user, 'edit_cars')
def panel_update_post():
    _id = request.args.get('_id')
    values_dict = {i: request.form.get(i) for i in request.form if i != 'name'}
    photos = {i: request.files.get(i) for i in request.files}

    response = Cars().update_car(photos=photos,
                                 _id=_id,
                                 values_dict=values_dict)
    return jsonify(response)
