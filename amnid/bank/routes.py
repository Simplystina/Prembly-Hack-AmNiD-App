import os
from typing import List

import requests
from flask import Blueprint
from .schema import BankListResponse

from amnid.schema import SuccessResponse
from amnid.main import cache

banks = Blueprint('banks', __name__)

@banks.get('/get_banks')
@cache.cached(timeout=300)
def get_banks():
    url = os.environ.get('IDENTITY_API_URL') + 'api/v1/biometrics/merchant/data/verification/bank_code'

    headers = {
    'x-api-key': os.environ.get('X_API_KEY')
    }
    payload = {}

    try:
        response = requests.request("GET", url, headers=headers, data=payload)
    
    except Exception as e:
        return {'message': 'Identity Pass cannot be reached', 'code': 'E00'}, 500

    try:
        response_json = response.json()['data']

        banks = []
        for bank in response_json:
            name = bank['name']
            code = bank['code']

            banks.append({'name': name, 'code': code})

        return banks, 200
    
    except Exception as e:
        return {'message': 'Server Error!', 'code': 'E00'}, 500