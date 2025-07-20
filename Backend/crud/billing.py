# crud/billing.py
from sqlalchemy.orm import Session
from models.billing import Billing
from schemas.billing import BillingCreate, BillingUpdate
from fastapi import HTTPException

def create_billing(db: Session, billing: BillingCreate):
    db_billing = Billing(**billing.dict())
    db.add(db_billing)
    db.commit()
    db.refresh(db_billing)
    return db_billing

def get_billing(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Billing).offset(skip).limit(limit).all()

def get_billing_by_customer(db: Session, customer_id: str):
    billing = db.query(Billing).filter(Billing.customer_id == customer_id).first()
    if not billing:
        raise HTTPException(status_code=404, detail="Billing record not found")
    return billing

def update_billing(db: Session, customer_id: str, billing_data: BillingUpdate):
    billing = db.query(Billing).filter(Billing.customer_id == customer_id).first()
    if not billing:
        raise HTTPException(status_code=404, detail="Billing record not found")
    for key, value in billing_data.dict(exclude_unset=True).items():
        setattr(billing, key, value)
    db.commit()
    db.refresh(billing)
    return billing

def delete_billing(db: Session, customer_id: str):
    billing = db.query(Billing).filter(Billing.customer_id == customer_id).first()
    if not billing:
        raise HTTPException(status_code=404, detail="Billing record not found")
    db.delete(billing)
    db.commit()
    return {"detail": "Billing record deleted"}
