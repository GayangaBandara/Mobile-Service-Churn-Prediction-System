from sqlalchemy.orm import Session
from models.location import Location
from schemas.location import LocationCreate , LocationUpdate
from fastapi import HTTPException

# Create
def create_location(db: Session, location: LocationCreate):
    db_location = Location(**location.dict())
    db.add(db_location)
    db.commit()
    db.refresh(db_location)
    return db_location

# Get
def get_locations(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Location).offset(skip).limit(limit).all()

# Get a location
def get_a_location(db:Session,zip_code: str):
    location = db.query(Location).filter(Location.zip_code == zip_code).first()
    if not location:
        raise HTTPException(status_code=404, detail="Location not found")
    return location

# Update
def update_a_location(db: Session, zip_code: str, updated_data: LocationUpdate):
    location = db.query(Location).filter(Location.zip_code == zip_code).first()
    if not location:
        raise HTTPException(status_code=404, detail="Location not found")
    for key, value in updated_data.dict(exclude_unset=True).items():
        setattr(location, key, value)
    db.commit()
    db.refresh(location)
    return location

# Delete
def delete_a_location(db: Session, zip_code: str):
    location = db.query(Location).filter(Location.zip_code == zip_code).first()
    if not location:
        raise HTTPException(status_code=404, detail="Location not found")
    db.delete(location)
    db.commit()
    return {"detail": "Location deleted"}