from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database.session import get_db

from crud.prediction import predict_churn

router = APIRouter(prefix="/predictions", tags=["Predictions"])

@router.post("/{customer_id}")
def get_prediction(customer_id:str,db: Session = Depends(get_db)):
    return predict_churn(customer_id,db)