from flask import Blueprint, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from flask_pydantic import validate
from amnid.bank.bank_class import BankAccount
from amnid.externals.identitypass import BVN
from amnid.image.image_class import ImageObj
from amnid.schema import ErrorResponse, SuccessResponse
from amnid.users.user_class import UserObj

from amnid.utils import verify_user
from .verification_class import VerificationObj

from .schema import GetVerifiedParams, UserVerificationParams

verify = Blueprint('verify', __name__)

@verify.post('/verify_account')
@validate()
@jwt_required()
def verify_account(body: UserVerificationParams):
    verify = verify_user(get_jwt_identity(), body.user_id)
    if verify: return verify

    data = body.dict()

    try:
        verifyObj = VerificationObj(user_id=data['user_id'])

        # Check if user is verified
        verifyObj.check_verification_status()

        # Verify Bank Account
        bank_account = BankAccount(user_id=data['user_id'])
        bank_account.verify_bank_account(details=data['account_details'])

        # Verify BVN and Image
        bvn_verification = BVN(bvn_id=data['bvn'], image=data['image'])
        verify_bvn = bvn_verification.verify_bvn()

        if verify_bvn['status'] == True:
            # Store Image
            user_image = ImageObj(user_id=data['user_id'])

            user_image.convert_and_store_image(string=data['image'])
            user_image.update_image()

            # Verify AMNID user
            verifyObj.verify_user()

        return SuccessResponse(
            message='User verified successfully!'
        )
    
    except Exception as e:
        return ErrorResponse(message=str(e)), 400

@verify.post('/get_verified_data')
@validate()
@jwt_required()
def get_verified_data(body: GetVerifiedParams):
    verify = verify_user(get_jwt_identity(), body.user_id)
    if verify: return verify

    try:
        user = UserObj(user_id=body.user_id).get_user()

        user_data = {
                    'account_holder': f"{user.first_name} {user.last_name}",
                    'account_number': user.user_bank.account_number,
                    'bank_name': user.user_bank.bank_name,
                    'social_media':{
                        'facebook': user.user_social_media.facebook,
                        'twitter': user.user_social_media.twitter,
                        'instagram': user.user_social_media.instagram,
                        'tiktok': user.user_social_media.tiktok
                    },
                    'image': request.host_url + f"static/img/{user.user_image.img_string}",
                    'verified': user.verified
                }
            
        return SuccessResponse(
            data=user_data
        )
    
    except Exception as e:
        return ErrorResponse(message=str(e)), 400