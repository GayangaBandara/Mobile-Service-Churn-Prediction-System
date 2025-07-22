from pydantic import BaseModel
from typing import Optional
from schemas.location import LocationResponse
from schemas.billing import BillingResponse
from schemas.service import ServicesResponse

class CustomerBase(BaseModel):
    gender: Optional[str] = None
    married: Optional[bool] = None
    dependents: Optional[bool]  = None
    number_of_dependents: Optional[int] = None
    partner: Optional[bool] = None
    senior_citizen: Optional[bool] = None
    under_30: Optional[bool] = None
    age: Optional[int] = None
    satisfaction_score: Optional[int] = None
    churn_score: Optional[int] = None
    cltv: Optional[float] = None
    churn_value: Optional[int] = None
    customer_status: Optional[str] = None
    zip_code: Optional[str] = None

class CustomerCreate(CustomerBase):
    customer_id: str

class CustomerUpdate(CustomerBase):
    pass

class CustomerResponse(CustomerCreate):
    location: Optional[LocationResponse] = None
    billing: Optional[BillingResponse] = None
    services: Optional[ServicesResponse] = None

    model_config = {
    "from_attributes": True
}

