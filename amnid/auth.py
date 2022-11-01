import os
from jose import JWTError, jwt
from dotenv import load_dotenv
from datetime import datetime, timedelta

load_dotenv()

# Values gotten from environment variables
SECRET_KEY = os.getenv('SECRET_KEY')
ALGORITHM = os.getenv('ALGORITHM')
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv('ACCESS_TOKEN_EXPIRE_MINUTES'))


def create_access_token(data: dict):
    ''' Generating the jwt tokens used across the service.'''
    data = data.__dict__
    data['date_of_joining'] = int(round(data['date_of_joining'].timestamp()))
    expire = datetime.now() + timedelta(minutes = ACCESS_TOKEN_EXPIRE_MINUTES)
    data.update({'exp': expire})

    encoded_jwt = jwt.encode(data, SECRET_KEY)

    return encoded_jwt