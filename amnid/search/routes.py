from flask import Blueprint
from flask_pydantic import validate
from sqlalchemy import func
from amnid.errors import UserError
from amnid.models import Store
from amnid.ratings.rating_class import Ratings
from amnid.schema import ErrorResponse, SuccessResponse
from amnid.users.schema import UsersResponseParam

from amnid.users.user_class import UserObj

from .schema import SearchParam, SearchResponse


search = Blueprint('search', __name__)

@search.post('/search_vendor')
@validate()
def search_vendor(body: SearchParam):
    data = body.text.strip().upper()

    try:
        if data[:3] == 'AMN' and data[3:].isdigit():
            user_id = data
        else:
            # Search database store
            find_store_by_name = Store.query.filter(func.lower(Store.name) == func.lower(data)).first()
            if find_store_by_name == None:
                raise UserError('Store not found!')
                
            user_id = find_store_by_name.user.user_id
        
        # data is vendor id
        vendorObj = UserObj(user_id)

        find_vendor = vendorObj.get_user()
        vendor_rating = Ratings(user_id).get_total_rating()
        
        data = {
            "first_name": find_vendor.first_name,
            "last_name": find_vendor.last_name,
            "bank_name": "",
            "account_number": "",
            "rate": vendor_rating['data']['rating'],
            "rating_count": vendor_rating['data']['ratings_count']
        }

        return SuccessResponse(
                data = data
            )

    except Exception as e:
        return ErrorResponse(message=str(e)), 400
