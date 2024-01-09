from flask import Flask, render_template
from flask_login import LoginManager

from config import secret_key

from models import Admin

from auth import auth
from panel import panel


app = Flask(__name__)
app.secret_key = secret_key

login_manager = LoginManager()
login_manager.init_app(app)


@login_manager.user_loader
def load_user(user_id):
    return Admin(id=user_id)


@app.route('/')
def hello():
    return render_template('base.html')


app.register_blueprint(auth)
app.register_blueprint(panel)
