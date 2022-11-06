from pydantic import BaseModel, validator, ValidationError
from typing import Optional
from datetime import datetime

from amnid.schema import ErrorResponse

class SocialMediaParam(BaseModel):
    facebook: Optional[str] = "#"
    instagram: Optional[str] = "#"
    twitter: Optional[str] = "#"
    tiktok: Optional[str] = "#"

    class Config:
        orm_mode = True

class CreateStoresParam(BaseModel):
    id_: Optional[str]
    user_id: str
    name: str
    description: Optional[str]
    social_media: SocialMediaParam

class UserStoreResponseParam(BaseModel):
    id: int
    name: str
    description: str
    social_media: SocialMediaParam
    date_of_creation: datetime

    class Config:
        orm_mode = True