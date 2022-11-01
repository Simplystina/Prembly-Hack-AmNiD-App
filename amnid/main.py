import os
import psycopg2
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
db = SQLAlchemy()

# Configure database
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URI') or "sqlite:///amnid.db"



from .users.routes import users

# Register blueprints
app.register_blueprint(users, url_prefix='/users')

from .models import *

# Initialize database
db.init_app(app)

with app.app_context():
    db.create_all()