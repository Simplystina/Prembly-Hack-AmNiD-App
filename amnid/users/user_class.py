import re
from amnid.main import db
from amnid.models import User
from amnid.utils import verify_params, hash_password, verify_secure_password
from verify_email import verify_email
from amnid.errors import UserError

class UserObj:
    def __init__(self, **data):
        data = data['body']

        self.id_ = data.id_
        self.first_name = data.first_name
        self.last_name = data.last_name
        self.email = data.email
        self.password = data.password
        self.data = data

    def generate_user_id(self):
        last_id = User.query.order_by(User.id.desc()).first()

        if last_id == None:
            last_id = 0

        last_id_inc = str(int(last_id.id) + 1)

        # The rjust attaches 0s if the length of the last_id_inc is less than 3
        self.user_id = 'AMN' + last_id_inc.rjust(3, '0')
    
    def check_email_exists(self, email):
        email = User.query.filter_by(email=email).first()

        if email != None:
            raise UserError('Email already exists!')

    def create_user(self):
        check_data = verify_params('id_', params=self.data.dict())
        # Validating data
        if check_data['status'] == False:
            return check_data['message']

        # Validating email
        # if verify_email(self.email) == False:
        #     return 'Email not valid!'

        # Check if email exists
        self.check_email_exists(self.email)
        
        # Validating if password is secure
        verify_secure_password(self.password)

        # Hash password
        hashed_password = hash_password(self.password)

        #Generate user_id
        self.generate_user_id()

        # Add new user to db
        new_user = User(user_id=self.user_id, first_name=self.first_name, last_name=self.last_name, email=self.email, password=hashed_password)

        db.session.add(new_user)
        db.session.commit()
        db.session.refresh(new_user)

        if new_user:
            return {'status': True, 'message': 'User created!', 'data': new_user}