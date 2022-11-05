import os
from flask_jwt_extended import create_access_token
from dotenv import load_dotenv

load_dotenv()

# Values gotten from environment variables
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv('ACCESS_TOKEN_EXPIRE_MINUTES'))


def create_token(data: dict):
    ''' Generating the jwt tokens used across the service.'''
    data = data.__dict__
    data['date_of_joining'] = int(round(data['date_of_joining'].timestamp()))

    encoded_jwt = create_access_token(identity=data)

    return encoded_jwt