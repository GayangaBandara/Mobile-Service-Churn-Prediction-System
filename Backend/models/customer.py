from sqlalchemy import Column, String, Integer, Boolean, Float, Text, ForeignKey
from database.base import Base
from sqlalchemy.orm import relationship

class Customer(Base):
    __tablename__ = "customers"

    customer_id = Column(String, primary_key=True, index=True)
    gender = Column(Text)
    married = Column(Boolean)
    dependents = Column(Boolean)
    number_of_dependents = Column(Integer)
    partner = Column(Boolean)
    senior_citizen = Column(Boolean)
    under_30 = Column(Boolean)
    age = Column(Integer)
    satisfaction_score = Column(Integer)
    churn_score = Column(Integer)
    cltv = Column(Float)
    churn_value = Column(Integer)
    customer_status = Column(Text)
    zip_code = Column(String, ForeignKey("locations.zip_code"))

    # Relationships
    # One-to-one or many-to-one (Customer → Location)
    location = relationship("Location", back_populates="customers")  # No delete-orphan

    # One-to-one
    billing = relationship("Billing", back_populates="customer", cascade="all, delete-orphan", uselist=False)

    # One-to-one
    services = relationship("Services", back_populates="customer", cascade="all, delete-orphan", uselist=False)

