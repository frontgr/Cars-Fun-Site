from datetime import timedelta

from flask import Flask
from flask_jwt_extended import JWTManager

from .config import secret_key, jwt_secret_key
from .response_handlers import refresh_expiring_jwts

from .models.admin import Admin

from .routers.main import main
from .routers.auth import auth
from .routers.panel import panel
from .routers.admins import admins

app = Flask(__name__)
app.secret_key = secret_key
app.config['JWT_SECRET_KEY'] = jwt_secret_key
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
app.config["JWT_COOKIE_SECURE"] = False
app.config["JWT_TOKEN_LOCATION"] = ["cookies"]

jwt = JWTManager(app)


@app.after_request
def after_request_handler(response):
    return refresh_expiring_jwts(response)


@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return Admin(_id=identity)


app.register_blueprint(main)
app.register_blueprint(auth)
app.register_blueprint(panel)
app.register_blueprint(admins)

