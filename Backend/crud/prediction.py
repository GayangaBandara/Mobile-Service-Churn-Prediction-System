import pandas as pd
from fastapi import Depends,HTTPException
from crud.customer import get_a_customer 
from sqlalchemy.orm import Session

import pickle


# Churn Value
with open("../Models/churn_value/churn_value.pkl", "rb") as f:
    model = pickle.load(f)
with open("../Models/churn_value/churn_value_encoder.pkl", "rb") as f:
    encoder = pickle.load(f)
with open("../Models/churn_value/churn_value_categorical_columns.pkl", "rb") as f:
    categorical_cols = pickle.load(f)

# Churn Score 
with open("../Models/churn_score/churn_score.pkl", "rb") as f:
    score_model = pickle.load(f)
with open("../Models/churn_score/churn_score_encoder.pkl", "rb") as f:
    score_encoder = pickle.load(f)
with open("../Models/churn_score/churn_score_categorical_columns.pkl", "rb") as f:
    score_categorical_cols = pickle.load(f)



def to_bool_int(value):
    if isinstance(value, bool):
        return int(value)
    if isinstance(value, str):
        return int(value.lower() == "true")
    return int(bool(value))


def predict_churn(customer_id: str, db: Session):
    customer = get_a_customer(customer_id=customer_id, db=db)
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")

    data = {
        "Age": customer.age,
        "Avg_Monthly_GB_Download": customer.billing.avg_monthly_gb_download,
        "Avg_Monthly_Long_Distance_Charges": customer.billing.avg_monthly_long_distance_charges,
        "CLTV": customer.cltv,
        "Contract": customer.billing.contract,
        "Dependents": int(customer.dependents),
        "Device_Protection_Plan": int(customer.services.device_protection_plan),
        "Gender": customer.gender,
        "Internet_Service": to_bool_int(customer.services.internet_service),
        "Internet_Type": customer.services.internet_type,
        "Married": int(customer.married),
        "Monthly_Charge": customer.billing.monthly_charge,
        "Multiple_Lines": int(customer.services.multiple_lines),
        "Number_of_Dependents": customer.number_of_dependents,
        "Number_of_Referrals": customer.number_of_referrals if hasattr(customer, 'number_of_referrals') else 0,
        "Offer": customer.billing.offer,
        "Online_Backup": int(customer.services.online_backup),
        "Online_Security": int(customer.services.online_security),
        "Paperless_Billing": int(customer.billing.paperless_billing),
        "Partner": int(customer.partner),
        "Payment_Method": customer.billing.payment_method,
        "Phone_Service": int(customer.services.phone_service),
        "Premium_Tech_Support": int(customer.services.premium_tech_support),
        "Referred_a_Friend": customer.referred_a_friend if hasattr(customer, 'referred_a_friend') else 0,
        "Satisfaction_Score": customer.satisfaction_score,
        "Senior_Citizen": int(customer.senior_citizen),
        "Streaming_Movies": int(customer.services.streaming_movies),
        "Streaming_Music": int(customer.services.streaming_music),
        "Streaming_TV": int(customer.services.streaming_tv),
        "Tenure_in_Months": customer.tenure_in_months if hasattr(customer, 'tenure_in_months') else 0,
        "Total_Charges": customer.billing.total_charges,
        "Total_Extra_Data_Charges": customer.billing.total_extra_data_charges,
        "Total_Long_Distance_Charges": customer.billing.total_long_distance_charges,
        "Total_Refunds": customer.billing.total_refunds,
        "Total_Revenue": customer.billing.total_revenue,
        "Under_30": int(customer.under_30),
        "Unlimited_Data": int(customer.services.unlimited_data),
    }

    # Convert to DataFrame
    input_df = pd.DataFrame([data])
    input_df.rename(columns=lambda x: x.replace("_", " "), inplace=True)

    # Transform categorical columns
    encoded_input = encoder.transform(input_df[categorical_cols])
    encoded_df = pd.DataFrame(encoded_input, columns=encoder.get_feature_names_out(categorical_cols))

    # Combine with numeric features
    numeric_df = input_df.drop(columns=categorical_cols)
    final_input = pd.concat([numeric_df.reset_index(drop=True), encoded_df.reset_index(drop=True)], axis=1)

    # Predict
    value_prediction = model.predict(final_input)[0]
    score_prediction = score_model.predict(final_input)[0]

    customer.churn_value = int(value_prediction)
    customer.churn_score = int(score_prediction)
    db.commit()

    return {
        "customer_id": customer_id,
        "churn_value": int(value_prediction),
        "churn_score": int(score_prediction)
    }