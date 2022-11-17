import os, requests

from amnid.errors import ServerError


class IdentityPass:

    def __init__(self, url:str, headers:dict={}, payload:dict={}, method:str="GET"):
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