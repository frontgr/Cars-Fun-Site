from flask import Blueprint, request

from ..db import CarOperations


public = Blueprint('main', __name__)


@public.route('/cars', methods=['GET'])
def get_cars():
    return CarOperations.get_cars(), 200


@public.route('/car', methods=['GET'])
def get_car():
    _id = request.args.get('_id')

    try:
        response = CarOperations.get_car(_id)
    except AttributeError:
        return '', 400

    return response, 200
