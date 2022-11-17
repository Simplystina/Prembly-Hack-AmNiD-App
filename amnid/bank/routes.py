import os
from typing import List
from flask_jwt_extended import get_jwt_identity, jwt_required

import requests
from flask import Blueprint
from flask_pydantic import validate
from amnid.bank.bank_class import BankAccount

from amnid.utils import verify_user
from .schema import AccountDetailsResponse, AccountNameParam, BankListResponse

from amnid.schema import ErrorResponse, SuccessResponse
from amnid.main import cache
from amnid.externals.identitypass import IdentityPass

banks = Blueprint('banks', __name__)

@banks.get('/get_banks')
@cache.cached(timeout=300)
def get_banks():
    url = 'api/v1/biometrics/merchant/data/verification/bank_code'
    connection = IdentityPass(url, method="GET")

    try:
        response_status = connection.response.status_code
        if response_status == 500:
            return ErrorResponse(message='External Server Error!'), 500

        response_json = connection.response.json()

        if response_json['status'] == True:
            response_json = response_json['data']

            banks = []
            for bank in response_json:
                name = bank['name']
                code = bank['code']

                banks.append({'name': name, 'code': code})

            return banks, 200
        
        else:
            return {'message': 'External Server Error!', 'code': 'E00'}, 500
    
    except Exception as e:
        return {'message': 'Server Error!', 'code': 'E00'}, 500

@banks.post('/get_account_name')
@validate()
@jwt_required()
def get_account_name(body: AccountNameParam):
    verify = verify_user(get_jwt_identity(), body.user_id)
    if verify: return verify

    userObj = BankAccount(user_id=body.user_id)

    # This returns the user's account name instead of the dummy data name
    try:
        account_name = userObj.get_account_name()

        return SuccessResponse(
            data = AccountDetailsResponse(
                account_number = body.number,
                account_name = account_name
            )
         ), 200
    
    except Exception as e:
        return ErrorResponse(message=str(e)), 400

    payload = {
        "number": os.environ.get('DUMMY_ACCOUNT_NUMBER'),
        "bank_code": os.environ.get('DUMMY_BANK_CODE')
    }

    url = 'api/v1/biometrics/merchant/data/verification/bank_account/advance'
    connection = IdentityPass(url, payload=payload, method="POST")

    try:
        response_status = connection.response.status_code
        if response_status == 500:
            return ErrorResponse(message='External Server Error!'), 500

        response_json = connection.response.json()

        if response_json['status'] == True:
            return SuccessResponse(
            message = response_json['detail'],
            data = AccountDetailsResponse(
                response_json['account_data']
                )
            ), 200
        else:
            return ErrorResponse(message='External Server Error!'), 500
    
    except Exception as e:
        return ErrorResponse(message=str(e)), 400

