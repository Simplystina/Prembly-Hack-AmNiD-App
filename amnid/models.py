from amnid.main import db
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
