import os
import psycopg2
from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
from datetime import datetime, timedelta
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager

load_dotenv()
app = Flask(__name__)
db = SQLAlchemy()
migrate = Migrate(app, db)
jwt = JWTManager(app)

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