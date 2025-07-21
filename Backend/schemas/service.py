# schemas/services.py
from pydantic import BaseModel
from typing import Optional

class ServicesBase(BaseModel):
    internet_service: Optional[str] = None
    internet_type: Optional[str] = None
    phone_service: Optional[bool] = None
    multiple_lines: Optional[bool] = None
    online_backup: Optional[bool] = None
    online_security: Optional[bool] = None
    streaming_tv: Optional[bool] = None
    streaming_music: Optional[bool] = None
    streaming_movies: Optional[bool] = None
    device_protection_plan: Optional[bool] = None
    premium_tech_support: Optional[bool] = None
    unlimited_data: Optional[bool] = None

class ServicesCreate(ServicesBase):
    customer_id: str

class ServicesUpdate(ServicesBase):
    pass

class ServicesResponse(ServicesCreate):
    model_config = {
    "from_attributes": True
}

