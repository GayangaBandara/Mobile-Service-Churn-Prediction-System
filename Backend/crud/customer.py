from sqlalchemy.orm import Session,joinedload
from models.customer import Customer
from schemas.customer import CustomerCreate, CustomerUpdate
from fastapi import HTTPException

# create
def create_customer(db: Session, customer: CustomerCreate):
    db_customer = Customer(**customer.dict())
    db.add(db_customer)
    db.commit()
    db.refresh(db_customer)
    return db_customer

# get
def get_customers(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Customer).offset(skip).limit(limit).all()

# get a customer

def get_a_customer(db: Session, customer_id: str):
    customer = (
        db.query(Customer)
        .options(
            joinedload(Customer.location),
            joinedload(Customer.services),
            joinedload(Customer.billing)
        )
        .filter(Customer.customer_id == customer_id)
        .first()
    )

    if not customer:
        return {"error": "Customer not found"}

    if not customer.services:
        print("Warning: No services record")

    if not customer.billing:
        print("Warning: No billing record")

    if not customer.location:
        print("Warning: No location record")

    return customer

   

# update 
def update_a_customer(db:Session,customer_id:str,updated_data:CustomerUpdate):
    customer = db.query(Customer).filter(Customer.customer_id==customer_id).first()
    if not customer : 
        raise HTTPException(status_code=404, detail="customer not found")
    for key,value in updated_data.dict(exclude_unset=True).items():
        setattr(customer,key,value)
    db.commit()
    db.refresh(customer)
    return customer 

# delete
def delete_a_customer(db:Session, customer_id:str):
    customer = db.query(Customer).filter(Customer.customer_id==customer_id).first()
    if not customer : 
        raise HTTPException(status_code=404, detail="customer not found")
    db.delete(customer)
    db.commit()
    return {"detail":"customer Deleted"}
