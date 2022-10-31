from flask import Blueprint

users = Blueprint('users', __name__)

@users.route('/')
def get_users():
    return {'message': 'We are here'}