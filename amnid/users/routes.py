from flask import Blueprint
from flask_pydantic import validate
from .schema import CreateUsersParam, CreateUserResponse, SuccessResponse, ErrorResponse, UsersResponseParam
from .user_class import UserObj

users = Blueprint('users', __name__)

@users.post('/create')
@validate()
def create(body: CreateUsersParam):
    new_user = UserObj(body=body)

    try:
        create_new_user = new_user.create_user()

        return SuccessResponse(
            message=create_new_user['message'],
            data = UsersResponseParam(**create_new_user['data'].__dict__)
        )

    except Exception as e:
        return ErrorResponse(message=str(e))
