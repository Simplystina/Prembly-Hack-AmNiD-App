from pydantic import BaseModel

class SearchParam(BaseModel):
    text: str

class SearchResponse(BaseModel):
    user_id: str
    first_name: str
    last_name: str
    bank_name: str
    rate: int
    rate_count: int