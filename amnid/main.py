from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from .users.routes import users

app = Flask(__name__)
db = SQLAlchemy()

# Configure database
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///amnid.db"

app.register_blueprint(users, url_prefix='/users')

db.init_app(app)

with app.app_context():
    db.create_all()