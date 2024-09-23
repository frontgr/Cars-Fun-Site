from datetime import datetime, timedelta, timezone

from flask import Flask
from flask_cors import CORS

from flask_jwt_extended import JWTManager
from flask_jwt_extended import get_jwt, create_access_token, get_jwt_identity, set_access_cookies

from .config import secret_key, jwt_secret_key, root_admin_login, root_admin_password

from .db import CurrentAdmin, AdminOperations

from .routers import public, auth
from .routers.admin_panel import admins_panel, cars_panel

app = Flask(__name__)
CORS(app, supports_credentials=True)

app.secret_key = secret_key
app.config['JWT_SECRET_KEY'] = jwt_secret_key
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
app.config["JWT_COOKIE_SECURE"] = False
app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
app.config['JWT_COOKIE_SAMESITE'] = 'Lax'
app.config['JWT_ACCESS_COOKIE_PATH'] = '/'

jwt = JWTManager(app)


# Если база данных пустая то создаст root админа
AdminOperations.create_root_admin(root_admin_login, root_admin_password)



@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            set_access_cookies(response, access_token)
        return response
    except (RuntimeError, KeyError):
        return response


@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return CurrentAdmin(id=identity)


app.register_blueprint(public)
app.register_blueprint(auth)
app.register_blueprint(admins_panel)
app.register_blueprint(cars_panel)

