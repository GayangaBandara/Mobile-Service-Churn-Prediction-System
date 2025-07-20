from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from schemas.customer import CustomerCreate, CustomerResponse,CustomerUpdate
from crud.customer import (create_customer, get_customers,get_a_customer,update_a_customer,delete_a_customer )
from database.session import get_db

router = APIRouter(prefix="/customers", tags=["Customers"])

@router.post("/", response_model=CustomerResponse)
def add_customer(customer: CustomerCreate, db: Session = Depends(get_db)):
    return create_customer(db, customer)

@router.get("/", response_model=List[CustomerResponse])
def list_customers(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return get_customers(db, skip, limit)

@router.get("/{customer_id}",response_model=CustomerResponse)
def read_customer(customer_id:str,db:Session = Depends(get_db)):
    return get_a_customer(db,customer_id)

@router.put("/{customer_id}", response_model=CustomerResponse)
def update_customer(customer_id:str,customer:CustomerUpdate,db:Session=Depends(get_db)):
    return update_a_customer(db,customer_id,customer)

@router.delete("/{customer_id}")
def delete_customer(customer_id: str, db: Session = Depends(get_db)):
    return delete_a_customer(db, customer_id)