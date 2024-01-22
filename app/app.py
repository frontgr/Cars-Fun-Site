from datetime import datetime
from datetime import timedelta
from datetime import timezone

from flask import Flask
from flask_jwt_extended import JWTManager, get_jwt, create_access_token, get_jwt_identity, set_access_cookies

from .config import secret_key, jwt_secret_key

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


@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return Admin(_id=identity)


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
        return {'status': 'Error',
                'message': 'Error during the update of the JWT token'}


app.register_blueprint(main)
app.register_blueprint(auth)
app.register_blueprint(panel)
app.register_blueprint(admins)
