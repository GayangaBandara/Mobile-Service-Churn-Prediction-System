# models/customer.py
from sqlalchemy import Column, String, Integer, Float, Boolean
from database.session import Base

class Customer(Base):
    __tablename__ = "customers"

    customer_id = Column(String(50), primary_key=True, index=True)
    gender = Column(String(10))
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
    churn_label = Column(String(20))
    churn_value = Column(Integer)
    churn_reason = Column(String(255))
    churn_category = Column(String(100))
    customer_status = Column(String(50))
