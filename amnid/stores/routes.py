from flask import Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_pydantic import validate

from amnid.schema import ErrorResponse, SuccessResponse
from amnid.stores.schema import CreateStoresParam, UserStoreResponseParam
from amnid.stores.store_class import StoreObj
from amnid.utils import verify_user

stores = Blueprint('stores', __name__)

@stores.post('/create')
@jwt_required()
@validate()
def create(body: CreateStoresParam):
    user = get_jwt_identity()

    verify = verify_user(jwt_id=user['user_id'], passed_id=body.user_id)
    if verify: return verify

    new_store = StoreObj(body=body)

    try:
        create_store = new_store.create_store()
        create_store['data'].social_media
        
        return SuccessResponse(
            message = create_store['message'],
            data = UserStoreResponseParam(**create_store['data'].__dict__)
        )
    
    except Exception as e:
        return ErrorResponse(message=str(e)), 400
