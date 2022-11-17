from pydantic import BaseModel
from typing import Optional
from datetime import datetime

from amnid.schema import SocialMediaParam, SuccessResponse, ErrorResponse

# User's classes
class CreateUsersParam(BaseModel):
    id_: Optional[str]
    first_name: str
    last_name: str
    email: str
    password: str

class UserEditInfoParam(BaseModel):
    user_id: str
    first_name: str
    last_name: str
    email: str

class UserInfoResponse(BaseModel):
    first_name: str
    last_name: str
    email: str

    class Config:
        orm_mode = True

class UsersResponseParam(BaseModel):
    user_id: str
    email: str

class LoginUserParam(BaseModel):
    id_: Optional[str]
    first_name: Optional[str]
    last_name: Optional[str]
    email: str
    password: str

class UserInfoParam(BaseModel):
    user_id: str
    first_name: Optional[str]
    last_name: Optional[str]
    email: str
    verified: bool
    date_of_joining: datetime


class LoginUserResponseParam(BaseModel):
    jwt_token: str
    user_icon: str

class UserSocialMediaParam(BaseModel):
    user_id: str
    social_media: SocialMediaParam

class UserSocialMediaResponse(BaseModel):
    social_media: SocialMediaParam

    class Config:
        orm_mode = True

class UserIdParam(BaseModel):
    user_id: str