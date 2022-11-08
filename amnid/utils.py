import re
import base64
from passlib.context import CryptContext
from amnid.errors import UserError
from amnid.schema import ErrorResponse

pwd_context = CryptContext(schemes=["bcrypt"])

def verify_params(*optional, **parameters):
    data = parameters['params']

    for key, value in data.items():
        if (key not in optional) and (value == None or len(value) == 0):
            raise UserError(f'{key} field is empty!')
    
    return {'status': True}

def hash_password(password: str):
    '''returns a hashed password'''
    return pwd_context.hash(password)
    
def verify_hashed_password(plain_password, hashed_password):
    verified = pwd_context.verify(plain_password, hashed_password)
    
    if verified == False:
        raise UserError('Password is incorrect!')

    return True

def verify_secure_password(password):
    reg = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{8,20}$"

    # compiling regex
    pat = re.compile(reg)
    
    # searching regex				
    mat = re.search(pat, password)
    
    # validating conditions
    if mat:
        return {'status': True, 'message': "Valid Password!"}
    else:
        raise UserError("Insecure Password!")

def verify_user(jwt_identity, passed_user_id):
    user_id = jwt_identity['user_id']

    if user_id != passed_user_id:
        return ErrorResponse(
            message = 'Unauthorised Access!'
            ), 401

    return False

def validate_data_length(key:str, value:str, min_length=0, max_length=float('inf')):
    if len(value.strip()) < min_length+1:
        raise UserError(f"{key} should be more than {min_length} character's")
    elif len(value.strip()) > max_length:
        raise UserError(f"{key} should be less than {max_length} character's")
