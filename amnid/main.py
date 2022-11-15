import os
from datetime import timedelta

from dotenv import load_dotenv
from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

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

from .stores.routes import stores
from .users.routes import users
from .ratings.routes import ratings
from .search.routes import search

# Register blueprints
app.register_blueprint(users, url_prefix='/users')
app.register_blueprint(stores, url_prefix='/stores')
app.register_blueprint(ratings, url_prefix='/ratings')
app.register_blueprint(search, url_prefix='/search')

from .models import *

# Initialize database
db.init_app(app)

with app.app_context():
    db.create_all()