from flask import Blueprint, request

from app.models.cars import Cars

main = Blueprint('main', __name__)


@main.route('/cars', methods=['GET'])
def get_cars():
    return Cars().get_cars(), 200


@main.route('/car', methods=['GET'])
def get_car():
    _id = request.args.get('_id')

    try:
        response = Cars().get_car(_id)
    except AttributeError:
        return '', 400

    return response, 200
