from flask import Blueprint, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from amnid.ratings.rating_class import Ratings
from amnid.ratings.schema import RatingParams, RatingResponse
from amnid.schema import ErrorResponse, SuccessResponse
from flask_pydantic import validate

from amnid.utils import verify_user

ratings = Blueprint('ratings', __name__)

@ratings.post('/rate_vendor')
@jwt_required()
@validate()
def rate_vendor(body: RatingParams):
    verify = verify_user(get_jwt_identity(), body.user_id)
    if verify: return verify

    if body.user_id == body.vendor_id:
        return ErrorResponse(message='Boss, no dey try rate yourself!'), 403

    rating_obj = Ratings(user_id=body.user_id)

    try:
        add_user_rating = rating_obj.rate_vendor(data=body.dict())

        rating = add_user_rating['data']
        vendor = rating.user
        image = request.host_url + f"static/img/{vendor.user_image.img_string}"

        return SuccessResponse(
            message = add_user_rating['message'],
            data = RatingResponse(
                vendor = vendor.__dict__,
                rating = rating.__dict__,
                vendor_icon = image 
            )
        ), 201
    
    except Exception as e:
        return ErrorResponse(message=str(e)), 400