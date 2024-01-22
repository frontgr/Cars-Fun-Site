from flask import Blueprint, request

from app.models.cars import Cars

main = Blueprint('main', __name__)


@main.route('/cars', methods=['POST'])
def get_all_cars():
    return Cars().get_cars()


@main.route('/get_car', methods=['POST'])
def get_car_by_id():
    _id = request.args.get('_id')

    response = Cars().get_car(_id)
    return response
