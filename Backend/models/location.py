from sqlalchemy import Column, String, Integer, Boolean, Float, Text, ForeignKey
from sqlalchemy.orm import relationship
from database.base import Base

class Location(Base):
    __tablename__ = "locations"

    zip_code = Column(String, primary_key=True, index=True)
    city = Column(Text)
    state = Column(Text)
    country = Column(Text)
    latitude = Column(Float)
    longitude = Column(Float)
    lat_long = Column(Text)
    population = Column(Integer)

    customers = relationship("Customer", back_populates="location")