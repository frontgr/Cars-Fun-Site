from flask import Blueprint, request, jsonify
from flask_login import login_required

from app.models.cars import Cars

admins = Blueprint('admins', __name__)


@admins.route('/panel/admins', methods=['POST'])
@login_required
def panel_post():
    pass
