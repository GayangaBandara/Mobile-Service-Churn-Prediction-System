# crud/services.py
from sqlalchemy.orm import Session
from models.service import Services
from schemas.service import ServicesCreate, ServicesUpdate
from fastapi import HTTPException

def create_service(db: Session, service: ServicesCreate):
    db_service = Services(**service.dict())
    db.add(db_service)
    db.commit()
    db.refresh(db_service)
    return db_service

def get_services(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Services).offset(skip).limit(limit).all()

def get_service_by_customer(db: Session, customer_id: str):
    service = db.query(Services).filter(Services.customer_id == customer_id).first()
    if not service:
        raise HTTPException(status_code=404, detail="Service record not found")
    return service

def update_service(db: Session, customer_id: str, data: ServicesUpdate):
    service = db.query(Services).filter(Services.customer_id == customer_id).first()
    if not service:
        raise HTTPException(status_code=404, detail="Service record not found")
    for key, value in data.dict(exclude_unset=True).items():
        setattr(service, key, value)
    db.commit()
    db.refresh(service)
    return service

def delete_service(db: Session, customer_id: str):
    service = db.query(Services).filter(Services.customer_id == customer_id).first()
    if not service:
        raise HTTPException(status_code=404, detail="Service record not found")
    db.delete(service)
    db.commit()
    return {"detail": "Service deleted"}
