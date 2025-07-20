from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from crud.location import (
    create_location,
    get_locations,
    get_a_location,
    update_a_location,
    delete_a_location 
)
from schemas.location import LocationCreate, LocationResponse, LocationUpdate
from database.session import get_db

router = APIRouter(prefix="/locations", tags=["Locations"])

@router.post("/", response_model=LocationResponse)
def add_location(location: LocationCreate, db: Session = Depends(get_db)):
    return create_location(db, location)

@router.get("/", response_model=List[LocationResponse])
def list_locations(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return get_locations(db, skip, limit)

@router.get("/{zip_code}", response_model=LocationResponse)
def read_location(zip_code: str, db: Session = Depends(get_db)):
    return get_a_location(db, zip_code)

@router.put("/{zip_code}", response_model=LocationResponse)
def update_location(zip_code: str, location: LocationUpdate, db: Session = Depends(get_db)):
    return update_a_location(db, zip_code, location)

@router.delete("/{zip_code}")
def delete_location(zip_code: str, db: Session = Depends(get_db)):
    return delete_a_location(db, zip_code)
