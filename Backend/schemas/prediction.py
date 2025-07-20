# schemas/prediction.py
from pydantic import BaseModel
from schemas.customer import CustomerBase
from schemas.service import ServicesBase
from schemas.billing import BillingBase
from schemas.location import LocationBase

class FullCustomerData(BaseModel):
    customer: CustomerBase
    location: LocationBase
    services: ServicesBase
    billing: BillingBase
