from flask import Blueprint
from flask_jwt_extended import get_jwt_identity, jwt_required
from flask_pydantic import validate
from amnid.bank.bank_class import BankAccount
from amnid.externals.identitypass import BVN
from amnid.image.image_class import ImageObj
from amnid.schema import ErrorResponse, SuccessResponse

from amnid.utils import verify_user
from .verification_class import VerificationObj

from .schema import UserVerificationParams

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

        print(verify_bvn)

        if verify_bvn['status'] == True:
            # Store Image
            user_image = ImageObj(user_id=data['user_id'])
            print('created user image object')
            user_image.convert_and_store_image(string=data['image'])
            user_image.update_image()

            # Verify AMNID user
            verifyObj.verify_user()
        
        return SuccessResponse(
            message='User verified successfully!'
        )
    
    except Exception as e:
        return ErrorResponse(message=str(e)), 400