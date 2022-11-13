from amnid.main import db, DEFAULT_IMAGE_STRING
from sqlalchemy.sql.expression import text

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    user_id = db.Column(db.String, unique=True, nullable=False)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    verified = db.Column(db.Boolean, server_default='FALSE')
    verify_status = db.Column(db.Integer, server_default='0')
    date_of_joining = db.Column(db.TIMESTAMP(timezone=True), nullable=False, server_default=text('now()'))
    user_image = db.relationship('Image', backref='user', lazy=True, uselist=False, cascade="all, delete")
    user_stores = db.relationship('Store', backref='user', lazy=True, cascade="all, delete")
    user_social_media = db.relationship('SocialMedia', backref='user', lazy=True, uselist=False, cascade="all, delete")
    ratings = db.relationship('Rating', backref='user', lazy=True, cascade="all, delete")

class Image(db.Model):
    id = db.Column(db.Integer, primary_key= True, nullable=False)
    user_id = db.Column(db.String, db.ForeignKey('user.user_id'), nullable=False, unique=True)
    img_string = db.Column(db.String, nullable=False, server_default='user.png')

class Store(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    user_id = db.Column(db.String, db.ForeignKey('user.user_id'), nullable=False)
    name = db.Column(db.String(20), nullable=False)
    description = db.Column(db.String(300))
    date_of_creation = db.Column(db.TIMESTAMP(timezone=True), nullable=False, server_default=text('now()'))
    social_media = db.relationship('SocialMedia', backref='store', lazy=True, uselist=False, cascade="all, delete")

class SocialMedia(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    user_id = db.Column(db.String, db.ForeignKey('user.user_id'), unique=True)
    store_id = db.Column(db.Integer, db.ForeignKey('store.id'), unique=True)
    facebook = db.Column(db.String, server_default='#')
    instagram = db.Column(db.String, server_default='#')
    twitter = db.Column(db.String, server_default='#')
    tiktok = db.Column(db.String, server_default='#')

class Rating(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    vendor_id = db.Column(db.String, db.ForeignKey('user.user_id'))
    rate = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.Text)
    rater_name = db.Column(db.String, nullable=False)
    rater_image = db.Column(db.String, nullable=False)