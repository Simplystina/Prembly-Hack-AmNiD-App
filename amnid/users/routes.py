from flask import Blueprint
from flask_jwt_extended import get_jwt_identity, jwt_required
from flask_pydantic import validate

from amnid.utils import verify_user

from .schema import CreateUsersParam, LoginUserResponseParam, UserEditInfoParam, UserIdParam, UserInfoParam, UserInfoResponse, UserSocialMediaParam, UserSocialMediaResponse, UsersResponseParam, LoginUserParam
from amnid.schema import SuccessResponse, ErrorResponse
from .user_class import UserObj

users = Blueprint('users', __name__)

@users.post('/create')
@validate()
def create(body: CreateUsersParam):
    new_user = UserObj()

    try:
        create_new_user = new_user.create_user(body=body)

        return SuccessResponse(
            message = create_new_user['message'],
            data = UsersResponseParam(**create_new_user['data'].__dict__)
        )

    except Exception as e:
        return ErrorResponse(message=str(e))

@users.post('/login')
@validate()
def login(body: LoginUserParam):
    user = UserObj()

    try:
        login_user = user.login_user(email=body.email, password=body.password)

        return SuccessResponse(
            message = login_user['message'],
            data = LoginUserResponseParam(**login_user['data'])
        )

    except Exception as e:
        return ErrorResponse(message=str(e)), 401

@users.post('/get_social_media')
@jwt_required()
@validate()
def get_social_media(body: UserIdParam):
    verify = verify_user(get_jwt_identity(), body.user_id)
    if verify: return verify

    try:
        user_obj = UserObj(user_id=body.user_id)
        user = user_obj.get_user()

        social_media = user.user_social_media

        return SuccessResponse(
                data = UserSocialMediaResponse(
                    social_media = social_media
                )
            ), 200
    
    except Exception as e:
        return ErrorResponse(message=str(e)), 400

@users.post('/add_social_media')
@jwt_required()
@validate()
def add_social_media(body: UserSocialMediaParam):
    verify = verify_user(get_jwt_identity(), body.user_id)
    if verify: return verify

    user_obj = UserObj(user_id=body.user_id)

    try:
        add_user_social = user_obj.add_social_media(social_media=body.social_media)

        return SuccessResponse(
            message = add_user_social['message'],
            data = UserSocialMediaResponse(
                **add_user_social['data'].__dict__
            )
        )
    
    except Exception as e:
        return ErrorResponse(message=str(e)), 400

@users.patch('/edit_user_info')
@jwt_required()
@validate()
def edit_user_info(body: UserEditInfoParam):
    verify = verify_user(get_jwt_identity(), body.user_id)
    if verify: return verify

    user_obj = UserObj(user_id=body.user_id)

    try:
        edit_user_info = user_obj.edit_user_info(user_info=body.dict())

        return SuccessResponse(
            message = edit_user_info['message'],
            data = UserInfoResponse(
                **edit_user_info['data'].__dict__
            )
        )
    
    except Exception as e:
        return ErrorResponse(message=str(e)), 400


@users.patch('/edit_social_media')
@jwt_required()
@validate()
def edit_social_media(body: UserSocialMediaParam):
    verify = verify_user(get_jwt_identity(), body.user_id)
    if verify: return verify

    user_obj = UserObj(user_id=body.user_id)

    try:
        edit_user_social = user_obj.edit_social_media(passed_social_media=body.social_media.dict())

        return SuccessResponse(
            message = edit_user_social['message'],
            data = UserSocialMediaResponse(
                **edit_user_social['data'].__dict__
            )
        )
    
    except Exception as e:
        return ErrorResponse(message=str(e)), 400