
from amnid.errors import UserError
from amnid.models import Bank
from amnid.users.user_class import UserObj

from amnid.main import db


class BankAccount(UserObj):

    def get_account_details(account_number, bank_id):
        pass

    def get_account_name(self):
        self.user = self.get_user()
        account_name = f'{self.user.first_name} {self.user.last_name}'

        return account_name
    
    def verify_bank_account(self, details):
        self.get_account_name()
        account_name_list = details['account_name'].split(' ')

        if self.user.first_name in account_name_list and self.user.last_name in account_name_list:
            # Store Bank details
            self.store_bank_details(details) 
            return {'status': True, 'message': 'Bank Account Verified!'}
        
        else:
            raise UserError(message='Bank Account name not verified!')

    def store_bank_details(self, details):
        account_details = self.user.user_bank
        account_details.account_number = details['account_number']
        account_details.account_name = details['account_name']
        account_details.bank_name = details['bank_name']
        account_details.bank_id = details['bank_id']

        db.session.commit()
    
    def post_bank_details(self):
        new_bank = Bank(user_id = self.user_id)

        db.session.add(new_bank)