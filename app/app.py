from flask import Flask
from flask_jwt_extended import JWTManager

from .config import secret_key, jwt_secret_key

from .models.admin import Admin

from .routers.main import main
from .routers.auth import auth
from .routers.panel import panel
from .routers.admins import admins

app = Flask(__name__)
app.secret_key = secret_key
app.config['JWT_SECRET_KEY'] = jwt_secret_key

jwt = JWTManager(app)


@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return Admin(_id=identity)


app.register_blueprint(main)
app.register_blueprint(auth)
app.register_blueprint(panel)
app.register_blueprint(admins)
