from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session, joinedload
from database.session import get_db
from models.customer import Customer

# Uncomment and load your real model
# from predict_model import model

router = APIRouter(prefix="/predict", tags=["Churn Prediction"])

@router.post("/{customer_id}", summary="Predict churn and update customer record")
def predict_churn_by_id(customer_id: str, db: Session = Depends(get_db)):

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

    if not customer or not customer.services or not customer.billing or not customer.location:
        return {"error": "Customer or related records not found"}

    # Step 2: Merge all related features
    def to_dict(obj):
        return {k: v for k, v in obj.__dict__.items() if not k.startswith("_")}

    features = {
        **to_dict(customer),
        **to_dict(customer.services),
        **to_dict(customer.billing),
        **to_dict(customer.location)
    }

    print(features)
    # # Step 3: Format input for ML model (REPLACE this with real feature mapping)
    # input_data = [[
    #     features.get("monthly_charge", 0),
    #     features.get("total_charges", 0),
    #     features.get("online_security", False),
    #     features.get("contract", "Month-to-month") == "Month-to-month",
    #     features.get("senior_citizen", False),
    #     features.get("dependents", False),
    #     features.get("streaming_tv", False),
    #     features.get("avg_monthly_gb_download", 0.0),
    #     features.get("satisfaction_score", 3),
    #     features.get("cltv", 1000.0)
    #     # Add more features in the exact order your model expects
    # ]]

    # # Step 4: Predict (replace with real model)
    # # prob = model.predict_proba(input_data)[0][1]
    # prob = 0.83  # Mocked value for now
    # label = "Churned" if prob > 0.5 else "Not Churned"
    # value = 1 if prob > 0.5 else 0
    # score = int(prob * 100)

    # # Step 5: Update customer record
    # customer.churn_label = label
    # customer.churn_value = value
    # customer.churn_score = score
    # db.commit()
    # db.refresh(customer)

    # # Step 6: Return response
    # return {
    #     "customer_id": customer.customer_id,
    #     "churn_label": label,
    #     "churn_probability": round(prob, 4),
    #     "churn_score": score
    # }
