# api/v1/endpoints/billing.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from crud.billing import (
    create_billing,
    get_billing,
    get_billing_by_customer,
    update_billing,
    delete_billing
)
from schemas.billing import BillingCreate, BillingResponse, BillingUpdate
from database.session import get_db

router = APIRouter(prefix="/billing", tags=["Billing"])

@router.post("/", response_model=BillingResponse)
def add_billing(billing: BillingCreate, db: Session = Depends(get_db)):
    return create_billing(db, billing)

@router.get("/", response_model=List[BillingResponse])
def list_billing(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return get_billing(db, skip, limit)

@router.get("/{customer_id}", response_model=BillingResponse)
def get_billing_by_id(customer_id: str, db: Session = Depends(get_db)):
    return get_billing_by_customer(db, customer_id)

@router.put("/{customer_id}", response_model=BillingResponse)
def update_billing_by_id(customer_id: str, billing: BillingUpdate, db: Session = Depends(get_db)):
    return update_billing(db, customer_id, billing)

@router.delete("/{customer_id}")
def delete_billing_by_id(customer_id: str, db: Session = Depends(get_db)):
    return delete_billing(db, customer_id)
