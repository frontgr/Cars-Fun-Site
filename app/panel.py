from flask import Blueprint, render_template
from flask_login import login_required, current_user

panel = Blueprint('panel', __name__)


@panel.route('/panel', methods=['GET'])
@login_required
def panel_get():
    return render_template('panel.html', name=current_user.login)


@panel.route('/panel', methods=['POST'])
@login_required
def panel_post():
    # return all cars from DB
    return None


@panel.route('/panel/add_car', methods=['POST'])
@login_required
def panel_add_post():
    # add car to DB
    pass


@panel.route('/panel/delete_car', methods=['POST'])
@login_required
def panel_delete_post():
    # delete car from DB
    pass


@panel.route('/panel/update_car', methods=['POST'])
@login_required
def panel_update_post():
    # update car
    pass
