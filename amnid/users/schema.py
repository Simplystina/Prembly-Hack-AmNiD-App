from pydantic import BaseModel
from typing import Optional

class SuccessResponse(BaseModel):
    ''' Return message for successful activity '''
    message: str = 'Success'
    code: str = '00'
    data: dict

class ErrorResponse(BaseModel):
    ''' Return message for unsuccessful activity '''
    message: str = 'Error'
    code: str = 'E00'

# User's classes
class CreateUsersParam(BaseModel):
    id_: Optional[str]
    first_name: str
    last_name: str
    email: str
    password: str

class UsersResponseParam(BaseModel):
    user_id: str
    email: str

class CreateUserResponse(BaseModel):
    info: SuccessResponse
    data: UsersResponseParam