from flask import Blueprint, render_template, redirect, url_for, request, flash
from werkzeug.security import check_password_hash
from flask_login import login_user, logout_user, current_user

from models import Admin

auth = Blueprint('auth', __name__)


@auth.route('/login', methods=['GET'])
def login_get():
    return render_template('login.html')


@auth.route('/login', methods=['POST'])
def login_post():
    login = request.form.get('login')
    password = request.form.get('password')

    admin = Admin(login)

    if admin.login is None or check_password_hash(admin.password, password) is False:
        flash('Please check your login details and try again.')
        return redirect(url_for('auth.login_get'))

    admin.is_authenticated_update(True)
    login_user(admin)
    return redirect(url_for('panel.panel_post'))

