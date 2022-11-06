from flask import Blueprint
from flask_pydantic import validate

from .schema import CreateUsersParam, LoginUserResponseParam, UsersResponseParam, LoginUserParam
from amnid.schema import SuccessResponse, ErrorResponse
from .user_class import UserObj

users = Blueprint('users', __name__)

@users.post('/create')
@validate()
def create(body: CreateUsersParam):
    new_user = UserObj(body=body)

    try:
        create_new_user = new_user.create_user()

        return SuccessResponse(
            message = create_new_user['message'],
            data = UsersResponseParam(**create_new_user['data'].__dict__)
        )

    except Exception as e:
        return ErrorResponse(message=str(e))

@users.post('/login')
@validate()
def login(body: LoginUserParam):
    user = UserObj(body=body)

    try:
        login_user = user.login_user()

        return SuccessResponse(
            message = login_user['message'],
            data = LoginUserResponseParam(**login_user['data'])
        )

    except Exception as e:
        return ErrorResponse(message=str(e)), 401