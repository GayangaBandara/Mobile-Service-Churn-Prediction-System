from sqlalchemy import Column, String, Boolean, Text, ForeignKey
from sqlalchemy.orm import relationship
from database.base import Base

class Services(Base):
    __tablename__ = "services"

    customer_id = Column(String, ForeignKey("customers.customer_id"), primary_key=True, index=True)
    internet_service = Column(Text)
    internet_type = Column(Text)
    phone_service = Column(Boolean)
    multiple_lines = Column(Boolean)
    online_backup = Column(Boolean)
    online_security = Column(Boolean)
    streaming_tv = Column(Boolean)
    streaming_music = Column(Boolean)
    streaming_movies = Column(Boolean)
    device_protection_plan = Column(Boolean)
    premium_tech_support = Column(Boolean)
    unlimited_data = Column(Boolean)

    customer = relationship("Customer", back_populates="services")
