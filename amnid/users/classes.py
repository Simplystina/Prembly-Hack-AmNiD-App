import re
from amnid.main import db
from amnid.models import User
from amnid.utils import verify_params
from verify_email import verify_email

class User:
    def __init__(first_name=None, last_name=None, email=None, password=None):
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.password = password

    def generate_user_id():
        last_id = db.query.order_by(User.id).desc().first()
        last_id_inc = str(int(last_id) + 1)

        # The rjust attaches 0s if the length of the last_id_inc is less than 3
        new_id = 'AMN' + last_id_inc.rjust(3, '0')

        return new_id
    
    def verify_password(password):
        reg = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{8,20}$"
	
        # compiling regex
        pat = re.compile(reg)
        
        # searching regex				
        mat = re.search(pat, password)
        
        # validating conditions
        if mat:
            return {'status': True, 'message': "Valid Password!"}
        else:
            return {'status': False, 'message': "Invalid Password!"}
    
    def check_email_exists(email):
        email = db.query.filter_by(email=email).first()

        if email == None:
            return {'status': False, 'message': 'Email does not exist.'}
        else:
            return {'status': True, 'message': 'Email already exists!'}

    def create_user(self):
        check_data = verify_params(params = {
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'password': self.password
        })
        # Validating data
        if check_data['status'] == False:
            return check_data['message']

        # Validating email
        if verify_email(self.email) == False:
            return 'Email not valid!'

        # Validating password
        check_password = verify_password(self.password)
        if check_password['status'] == False:
            return check_password['message']

        # Check if email exists
        check_email = check_email_exists(self.email)
        if check_email['status'] == True:
            return check_email['message']

        # Add new user to db