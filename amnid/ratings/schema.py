from pydantic import BaseModel
from typing import Optional

class RatingParams(BaseModel):
    user_id: str
    vendor_id: str
    rate: int
    comment: str

class RatingUserResponseParam(BaseModel):
    first_name: str
    last_name: str

    class Config():
        orm = True

class RatingResponseParam(BaseModel):
    rate: int
    comment: str

class RatingResponse(BaseModel):
    vendor: RatingUserResponseParam
    rating: RatingResponseParam
    vendor_icon: str

    class Config():
        orm = True
