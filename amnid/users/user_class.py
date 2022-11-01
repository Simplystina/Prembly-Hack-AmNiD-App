import re
from flask import request
from .schema import UserInfoParam
from amnid.auth import create_access_token
from amnid.main import db
from amnid.models import Image, User
from amnid.utils import verify_hashed_password, verify_params, hash_password, verify_secure_password
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

        return email

    def create_user(self):
        check_data = verify_params('id_', params=self.data.dict())
        # Validating data
        if check_data['status'] == False:
            return check_data['message']

        # Validating email
        # if verify_email(self.email) == False:
        #     return 'Email not valid!'

        # Check if email exists
        check_email = self.check_email_exists(self.email)
        if check_email != None:
            raise UserError('Email already exists!')
        
        # Validating if password is secure
        verify_secure_password(self.password)

        # Hash password
        hashed_password = hash_password(self.password)

        #Generate user_id
        self.generate_user_id()

        # Add new user to db
        new_user = User(user_id=self.user_id, first_name=self.first_name, last_name=self.last_name, email=self.email, password=hashed_password)

        db.session.add(new_user)
        user_image = Image(user_id=new_user.user_id)
        db.session.add(user_image)
        db.session.commit()
        db.session.refresh(new_user)

        if new_user:
            return {'status': True, 'message': 'User created!', 'data': new_user}
        else:
            return {'status': True, 'message': 'User not created!', 'data': {}}

    def login_user(self):
        get_user = self.check_email_exists(email=self.email)

        if get_user == None:
            raise UserError('Email does not exist!')
        
        # Verify the user's password
        user_password = get_user.password
        verify_password = verify_hashed_password(self.password, user_password)
        if verify_password == False:
            raise UserError('Password is incorrect!')

        # Add image to send to client-side
        image = request.host_url + f"static/img/{get_user.user_image.img_string}"
 
        user_data = UserInfoParam(**get_user.__dict__)

        # Generate token
        token = create_access_token(user_data)

        return {'status': True, 'message': 'User logged in!', 'data': {'jwt_token': token, 'user_icon': image}}
        
        