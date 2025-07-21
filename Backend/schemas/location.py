from pydantic import BaseModel
from typing import Optional

class LocationBase(BaseModel):
    city: Optional[str] = None
    state: Optional[str] = None
    country: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    lat_long: Optional[str] = None
    population: Optional[int] = None

class LocationCreate(LocationBase):
    zip_code: str

class LocationUpdate(LocationBase):
    pass

class LocationResponse(LocationCreate):
    model_config = {
    "from_attributes": True
}
