import json

from flask import Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_pydantic import validate

from amnid.schema import ErrorResponse, SuccessResponse
from amnid.stores.schema import CreateStoresParam, EditStoreInfoParam, EditStoreSocialMediaParam, FetchStoreParam, FetchStoresParam, UserStoreResponseParam, FetchStoresResponse
from amnid.stores.store_class import StoreObj
from amnid.utils import verify_user

stores = Blueprint('stores', __name__)

@stores.post('/create')
@jwt_required()
@validate()
def create(body: CreateStoresParam):
    verify = verify_user(get_jwt_identity(), body.user_id)
    if verify: return verify

    new_store = StoreObj(user_id=body.user_id)

    try:
        create_store = new_store.create_store(body=body)
        create_store['data'].social_media
        
        return SuccessResponse(
            message = create_store['message'],
            data = UserStoreResponseParam(**create_store['data'].__dict__)
        )
    
    except Exception as e:
        return ErrorResponse(message=str(e)), 400

@stores.get('/fetch_all')
@jwt_required()
@validate()
def fetch_all(body: FetchStoresParam):
    verify = verify_user(get_jwt_identity(), body.user_id)
    if verify: return verify

    store_obj = StoreObj(user_id=body.user_id)

    try:
        fetch_stores = store_obj.fetch_all()
        
        
        return SuccessResponse(
            message = fetch_stores['message'],
            data = FetchStoresResponse(
                stores = fetch_stores['data']
            )
        )
    
    except Exception as e:
        return ErrorResponse(message=str(e)), 400

@stores.get('/fetch_one')
@validate()
def fetch_one(body: FetchStoreParam):
    store_obj = StoreObj(user_id=0)

    try:
        fetch_store = store_obj.fetch_one(store_id=body.store_id)
        fetch_store['data'].social_media
        
        return SuccessResponse(
            message = fetch_store['message'],
            data = UserStoreResponseParam(
                **fetch_store['data'].__dict__
            )
        )
    
    except Exception as e:
        return ErrorResponse(message=str(e)), 400

@stores.patch('/edit_store_info')
@jwt_required()
@validate()
def edit_store_info(body: EditStoreInfoParam):
    verify = verify_user(get_jwt_identity(), body.user_id)
    if verify: return verify

    store_obj = StoreObj(user_id=body.user_id)

    try:
        edit_store = store_obj.edit_one(store_id=body.store_id, data=body.dict())
        edit_store['data'].social_media
        
        return SuccessResponse(
            message = edit_store['message'],
            data = UserStoreResponseParam(
                **edit_store['data'].__dict__
            )
        )
    
    except Exception as e:
        return ErrorResponse(message=str(e)), 400

@stores.patch('/edit_store_social_media')
@jwt_required()
@validate()
def edit_store_social_media(body: EditStoreSocialMediaParam):
    verify = verify_user(get_jwt_identity(), body.user_id)
    if verify: return verify

    store_obj = StoreObj(user_id=body.user_id)

    try:
        edit_store_social = store_obj.edit_store_social(store_id=body.store_id, data=body.dict())
        edit_store_social['data'].social_media

        return SuccessResponse(
            message = edit_store_social['message'],
            data = UserStoreResponseParam(
                **edit_store_social['data'].__dict__
            )
        )
    
    except Exception as e:
        return ErrorResponse(message=str(e)), 400