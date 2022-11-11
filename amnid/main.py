import os
import psycopg2

from flask import Flask, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
from datetime import timedelta

load_dotenv()
app = Flask(__name__)
db = SQLAlchemy()
migrate = Migrate(app, db)
jwt = JWTManager(app)
CORS(app)

# Configure JWT
@jwt.expired_token_loader
def my_expired_token_callback(jwt_header, jwt_payload):
    return jsonify(
        code = 'E10',
        message = 'Access token has expired!'
    ), 401

# Configure application
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URI') or "sqlite:///amnid.db"
app.config['JWT_SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(minutes=int(os.getenv('ACCESS_TOKEN_EXPIRE_MINUTES')))

DEFAULT_IMAGE_STRING = os.getenv('DEFAULT_IMAGE_STRING')

from .users.routes import users
from .stores.routes import stores

# Register blueprints
app.register_blueprint(users, url_prefix='/users')
app.register_blueprint(stores, url_prefix='/stores')

from .models import *

# Initialize database
db.init_app(app)

with app.app_context():
    db.create_all()