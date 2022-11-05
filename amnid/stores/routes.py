from flask import Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_pydantic import validate

from amnid.stores.schema import CreateStoresParam

stores = Blueprint('stores', __name__)

@stores.route('/create')
@jwt_required()
@validate()
def create(body: CreateStoresParam):
    user = get_jwt_identity()
    return user