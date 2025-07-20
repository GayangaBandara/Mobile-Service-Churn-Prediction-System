# schemas/billing.py
from pydantic import BaseModel
from typing import Optional

class BillingBase(BaseModel):
    contract: Optional[str] = None
    monthly_charge: Optional[float] = None
    total_charges: Optional[float] = None
    payment_method: Optional[str] = None
    paperless_billing: Optional[bool] = None
    offer: Optional[str] = None
    total_revenue: Optional[float] = None
    total_refunds: Optional[float] = None
    total_extra_data_charges: Optional[float] = None
    total_long_distance_charges: Optional[float] = None
    avg_monthly_long_distance_charges: Optional[float] = None
    avg_monthly_gb_download: Optional[float] = None

class BillingCreate(BillingBase):
    customer_id: str

class BillingUpdate(BillingBase):
    pass

class BillingResponse(BillingCreate):
    class Config:
        orm_mode = True
