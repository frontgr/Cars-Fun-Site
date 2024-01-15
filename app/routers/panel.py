from flask import Blueprint, request, jsonify
from flask_login import login_required

from app.models.cars import Cars

panel = Blueprint('panel', __name__)


@panel.route('/panel', methods=['POST'])
@login_required
def panel_post():
    return jsonify(Cars().get_cars())


@panel.route('/panel/add_car', methods=['POST'])
@login_required
def panel_add_post():
    name = request.form.get('name')
    number = request.form.get('number')
    speed_up = request.form.get('speed_up')
    max_speed = request.form.get('max_speed')
    photos = {i: request.files.get(i) for i in request.files}

    response = Cars().add_new_car(
                        name=name,
                        number=number,
                        speed_up=speed_up,
                        max_speed=max_speed,
                        photos=photos
                        )

    return response


@panel.route('/panel/delete_car', methods=['DELETE'])
@login_required
def panel_delete():
    _id = request.args.get('_id')

    response = Cars().delete_car(_id)
    return response


@panel.route('/panel/update_car', methods=['POST'])
@login_required
def panel_update_post():
    values = {i: request.form.get(i) for i in request.form if i != 'name'}
    photos = {i: request.files.get(i) for i in request.files}

    response = Cars().update_car(photos=photos, values_dict=values)
    return response
