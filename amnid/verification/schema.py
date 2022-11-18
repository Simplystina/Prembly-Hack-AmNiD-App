from pydantic import BaseModel


class AccountDetailsParams(BaseModel):
    account_name: str
    account_number: str
    bank_name: str
    bank_code: str

class UserVerificationParams(BaseModel):
    user_id: str
    bvn: str
    image: str
    account_details: AccountDetailsParams

    class Config:
        orm_mode = True

class GetVerifiedParams(BaseModel):
    user_id: str