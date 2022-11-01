import re
import base64
from passlib.context import CryptContext
from amnid.errors import UserError

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
    return pwd_context.verify(plain_password, hashed_password)

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