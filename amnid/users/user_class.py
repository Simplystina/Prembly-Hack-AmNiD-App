from flask import request

from amnid.social_media.social_media_class import UserSocialMediaObj, new_social_media
from .schema import UserInfoParam
from amnid.auth import create_token
from amnid.main import db
from amnid.models import Bank, Image, User
from amnid.utils import verify_hashed_password, verify_params, hash_password, verify_secure_password
from verify_email import verify_email
from amnid.errors import ServerError, UserError

class UserObj:
    def __init__(self, user_id=None):
        self.user_id = user_id

    def get_user(self):
        find_user = User.query.filter_by(user_id=self.user_id.upper()).first()

        if find_user == None:
            raise UserError('User not found!')
            
        return find_user
        
    def generate_user_id(self):
        last_id = User.query.order_by(User.id.desc()).first()

        if last_id == None:
            last_id = 0
        else:
            last_id = last_id.id

        last_id_inc = str(int(last_id) + 1)

        # The rjust attaches 0s if the length of the last_id_inc is less than 3
        self.user_id = 'AMN' + last_id_inc.rjust(3, '0')
    
    def check_email_exists(self, email):
        email = User.query.filter_by(email=email).first()

        return email

    def create_user(self, **data):
        data = data['body']
        self.first_name = data.first_name
        self.last_name = data.last_name
        self.email = data.email
        self.password = data.password
        self.data = data

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
        
        # Add user image
        user_image = ImageObj(user_id=new_user.user_id)
        user_image.post_image()

        # Add user bank details
        user_bank = BankAccount(user_id=new_user.user_id)
        user_bank.post_bank_details()

        # Add social media row for user
        user_social_media = new_social_media(user_id=new_user.user_id)

        db.session.commit()
        db.session.refresh(new_user)

        if new_user:
            return {'status': True, 'message': 'User created!', 'data': new_user}
        else:
            raise ServerError('User not created!')

    def login_user(self, email, password):
        self.email = email
        self.password = password

        get_user = self.check_email_exists(email=self.email)

        if get_user == None:
            raise UserError('Email does not exist!')
        
        # Verify the user's password
        verify_hashed_password(self.password, get_user.password)

        # Add image to send to client-side
        image = request.host_url + f"static/img/{get_user.user_image.img_string}"
 
        user_data = UserInfoParam(**get_user.__dict__)

        # Generate token
        token = create_token(user_data)

        return {'status': True, 'message': 'User logged in!', 'data': {'jwt_token': token, 'user_icon': image}}
        
    def add_social_media(self, social_media):
        try:
            social_media = UserSocialMediaObj(user_id=self.user_id, social_media=social_media)
            social_media.create_social_media()
        except Exception as e:
            raise ServerError('Server Error!')

        if social_media:
            return {'status': True, 'message': 'Social media updated!', 'data': social_media}
        else:
            raise ServerError('Social media not updated!')

    def edit_social_media(self, passed_social_media):
        user = self.get_user()

        social_media = UserSocialMediaObj(user_id=self.user_id, social_media=user.user_social_media)

        social_media.edit_social_media(new_social_media=passed_social_media)

        if social_media:
            return {'status': True, 'message': 'Social media updated!', 'data': social_media}
        else:
            raise ServerError('Social media not updated!')

    def edit_user_info(self, user_info):
        user = self.get_user()

        if user.verified == True:
            raise UserError('Details cannot be edited after verification!')
        
        user.first_name = user_info['first_name']
        user.last_name = user_info['last_name']
        user.email = user_info['email']

        db.session.commit()
        db.session.refresh(user)

        return {'status': True, 'message': 'Info updated!', 'data': user}

from amnid.bank.bank_class import BankAccount
from amnid.image.image_class import ImageObj