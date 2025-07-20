from sqlalchemy import Column, String, Integer, Boolean, Float, Text, ForeignKey
from database.base import Base

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
    churn_label = Column(Text)
    churn_value = Column(Integer)
    churn_reason = Column(Text)
    churn_category = Column(Text)
    customer_status = Column(Text)
    zip_code = Column(String, ForeignKey("locations.zip_code"))
