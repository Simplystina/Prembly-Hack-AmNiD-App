from pydantic import BaseModel
from typing import List

class RatingParams(BaseModel):
    user_id: str
    vendor_id: str
    rate: int
    comment: str

class GetRatingsParam(BaseModel):
    vendor_id: str

class RatingUserResponseParam(BaseModel):
    first_name: str
    last_name: str

    class Config:
        orm_mode = True

class RatingResponseParam(BaseModel):
    rate: int
    comment: str

class RatingResponse(BaseModel):
    vendor: RatingUserResponseParam
    rating: RatingResponseParam
    vendor_icon: str

    class Config:
        orm_mode = True

class VendorRatingResponseParam(BaseModel):
    rater_name: str
    rater_image: str
    rate: int
    comment: str

    class Config:
        orm_mode = True

class VendorRatingResponse(BaseModel):
    data: List[VendorRatingResponseParam]

class VendorTotalRatingResponse(BaseModel):
    ratings_count: int
    rating: int