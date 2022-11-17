
from amnid.errors import UserError
from amnid.main import db
from amnid.users.user_class import UserObj


class VerificationObj(UserObj):

    def check_verification_status(self):
        self.user = self.get_user()
        if self.user.verified == True:
            raise UserError('User already verified!')

    def verify_user(self):
        self.user.verified = True

        db.session.commit()

        
        
