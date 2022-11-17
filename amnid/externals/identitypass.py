import os, requests

from amnid.errors import ServerError, UserError


class IdentityPass:

    def __init__(self, url: str, headers: dict = {}, payload: dict = {}, method: str = "GET"):
        self.url = os.environ.get('IDENTITY_API_URL') + url
        self.headers = {'x-api-key': os.environ.get('X_API_KEY')}
        self.headers.update(headers)
        self.payload = payload
        self.method = method

        self.connect()

    def connect(self):
        try:
            self.response = requests.request(self.method, self.url, headers=self.headers, data=self.payload)
        
        except Exception as e:
            raise ServerError('Internal Server Error!')

class BVN:
    def __init__(self, bvn_id, image):
        self.bvn_id = bvn_id
        self.image = image

    def verify_bvn(self):
        url = 'api/v1/biometrics/merchant/data/verification/bvn_w_face'
        payload = {
            'number': self.bvn_id,
            'image': self.image
        }
        
        connection = IdentityPass(url=url, payload=payload, method="POST")
        response_status = connection.response.status_code

        if response_status == '500':
            raise ServerError('External Server Error!')
        
        response_json = connection.response.json()

        # Remove for production
        return {'status': True, 'message': 'BVN Verified!'}

        # Check if BVN verification failed
        if response_json['status'] == False:
            raise UserError(response_json['detail'])
        
        # Check if Image verification failed
        if response_json['face_data']['status'] == False:
            raise UserError(response_json['face_data']['message'])
        
        return {'status': True, 'message': 'BVN Verified!'}
        
