from pydantic import BaseModel
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

class FetchStoresParam(BaseModel):
    user_id: str

class FetchStoresResponse(BaseModel):
    stores: list[UserStoreResponseParam]

class FetchStoreParam(BaseModel):
    store_id: int
    user_id: str

class EditStoreInfoParam(BaseModel):
    store_id: int
    user_id: str
    name: str
    description: str

    class Config:
        orm_mode = True

class EditStoreSocialMediaParam(BaseModel):
    store_id: int
    user_id: str
    social_media: SocialMediaParam