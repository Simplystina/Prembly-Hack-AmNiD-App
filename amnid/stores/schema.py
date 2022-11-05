from pydantic import BaseModel
from typing import Optional

class CreateStoresParam(BaseModel):
    id_: Optional[str]
    user_id: str
    name: str
    description: Optional[str]
    social_media: dict