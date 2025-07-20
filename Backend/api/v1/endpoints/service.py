# api/v1/endpoints/services.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from crud.service import (
    create_service,
    get_services,
    get_service_by_customer,
    update_service,
    delete_service
)
from schemas.service import ServicesCreate, ServicesResponse, ServicesUpdate
from database.session import get_db

router = APIRouter(prefix="/services", tags=["Services"])

@router.post("/", response_model=ServicesResponse)
def add_service(service: ServicesCreate, db: Session = Depends(get_db)):
    return create_service(db, service)

@router.get("/", response_model=List[ServicesResponse])
def list_services(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return get_services(db, skip, limit)

@router.get("/{customer_id}", response_model=ServicesResponse)
def get_service(customer_id: str, db: Session = Depends(get_db)):
    return get_service_by_customer(db, customer_id)

@router.put("/{customer_id}", response_model=ServicesResponse)
def update_service_by_customer(customer_id: str, service: ServicesUpdate, db: Session = Depends(get_db)):
    return update_service(db, customer_id, service)

@router.delete("/{customer_id}")
def delete_service_by_customer(customer_id: str, db: Session = Depends(get_db)):
    return delete_service(db, customer_id)
