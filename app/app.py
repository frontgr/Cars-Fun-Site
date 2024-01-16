from flask import Flask
from flask_login import LoginManager

from .config import secret_key
from .models.admin import Admin

from .routers.main import main
from .routers.auth import auth
from .routers.panel import panel
from .routers.admins import admins

app = Flask(__name__)
app.secret_key = secret_key

login_manager = LoginManager()
login_manager.init_app(app)


@login_manager.user_loader
def load_user(user_id):
    return Admin(_id=user_id)


app.register_blueprint(main)
app.register_blueprint(auth)
app.register_blueprint(panel)
app.register_blueprint(admins)
