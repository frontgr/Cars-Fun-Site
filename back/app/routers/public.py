from flask import Blueprint, request, jsonify

from ..db import CarOperations


public = Blueprint('main', __name__)


@public.route('/cars', methods=['GET'])
def get_cars():
    return jsonify(CarOperations.get_public_cars()), 200


@public.route('/car', methods=['GET'])
def get_car():
    id = request.args.get('id')

    try:
        return jsonify(CarOperations.get_car(id)), 200
    except AttributeError:
        return {"msg": "Record not found"}, 400
