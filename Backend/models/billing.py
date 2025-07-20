# models/billing.py
from sqlalchemy import Column, String, Float, Boolean, Text, ForeignKey
from sqlalchemy.orm import relationship
from database.base import Base

class Billing(Base):
    __tablename__ = "billing"

    customer_id = Column(String, ForeignKey("customers.customer_id"), primary_key=True, index=True)
    contract = Column(Text)
    monthly_charge = Column(Float)
    total_charges = Column(Float)
    payment_method = Column(Text)
    paperless_billing = Column(Boolean)
    offer = Column(Text)
    total_revenue = Column(Float)
    total_refunds = Column(Float)
    total_extra_data_charges = Column(Float)
    total_long_distance_charges = Column(Float)
    avg_monthly_long_distance_charges = Column(Float)
    avg_monthly_gb_download = Column(Float)

    customer = relationship("Customer", back_populates="billing")
