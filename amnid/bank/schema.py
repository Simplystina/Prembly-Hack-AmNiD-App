from typing import List
from pydantic import BaseModel

class BankListResponseParam(BaseModel):
    name: str
    code: str

    class Config:
        orm_mode = True

class BankListResponse(BaseModel):
    data: List[BankListResponseParam]

    class Config:
        orm_mode = True

class AccountNameParam(BaseModel):
    user_id: str
    bank_code: str
    number: str

class AccountDetailsResponse(BaseModel):
    account_number: str
    account_name: str
