"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import ProfileDetails from "./Details/ProfileDetails";
import LocationDetails from "./Details/LocationDetails";
import ServicesDetails from "./Details/ServicesDetails";
import BillingDetails from "./Details/BillingDetails";
import InsightsPanel from "./CustomerInsights";

export default function CustomerDetailPage() {
  const params = useParams();
  const customer_id = params?.customer_id as string;

  const router = useRouter();

  const [customer, setCustomer] = useState<any>(null);
  const [insights, setInsights] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/customers/${customer_id}`
        );
        setCustomer(res.data);
        console.log(res.data);
      } catch (err) {
        console.error("Error loading customer", err);
      }
    };

    if (customer_id) {
      fetchCustomer();
    }
  }, [customer_id]);

  useEffect(() => {
    if (customer) {
      setProfile({
        customer_id: customer.customer_id,
        gender: customer.gender,
        married: customer.married,
        dependents: customer.dependents,
        number_of_dependents: customer.number_of_dependents,
        partner: customer.partner,
        senior_citizen: customer.senior_citizen,
        under_30: customer.under_30,
        age: customer.age,
        satisfaction_score: customer.satisfaction_score,
        cltv: customer.cltv,
        customer_status: customer.customer_status,
      });
    }
  }, [customer]);

  const handlePredict = async () => {
    try {
      const res = await axios.post(`http://localhost:8000/predict-churn`, {
        customer_id,
      });

      const prediction = res.data;

      setInsights({
        churn_category: prediction.churn_category,
        churn_label: prediction.churn_label,
        churn_reason: prediction.churn_reason,
        churn_score: prediction.churn_score,
        churn_value: prediction.churn_value,
      });
    } catch (err) {
      console.error("Error predicting churn", err);
      alert("Failed to predict churn insights.");
    }
  };

  if (!customer) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="pt-10 pl-20 pr-20">
      <h1 className="text-2xl font-bold mb-4">
        Customer Details: {customer.customer_id}
      </h1>

      {!insights  && (
        <div className="bg-white shadow-lg flex items-center justify-center rounded-lg p-6 mt-10 w-full max-w-3xl mx-auto">
          <button
            onClick={handlePredict}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Predict Insights
          </button>
        </div>
      )}

      {insights && <InsightsPanel insights={insights} />}

      <div className="flex items-center justify-center">
        {/* Profile Section */}
        {profile && <ProfileDetails {...profile} />}

        {/* Location */}
        {customer.location && <LocationDetails {...customer.location} />}
      </div>
      <div className="flex items-center justify-center">
        {/* Services */}
        {!customer.services && (
          <div className="bg-white shadow-2xl rounded-lg m-8 p-6 w-[520px] h-[400px] flex flex-col gap-2 items-center justify-center">
            <p className="text-[20px] font-semibold">Services</p>
            <button
              className="bg-blue-500 text-white w-[180px] h-[40px] rounded hover:bg-blue-600"
              onClick={() => {
                router.push(
                  `/add-services?customer_id=${customer.customer_id}`
                );
              }}
            >
              Add Services
            </button>
          </div>
        )}
        {customer.services && <ServicesDetails {...customer.services} />}

        {/* Billing */}
        {!customer.billing && (
          <div className="bg-white shadow-2xl rounded-lg m-8 p-6 w-[520px] h-[400px] flex flex-col gap-2 items-center justify-center">
            <p className="text-[20px] font-semibold">Billing</p>
            <button
              className="bg-blue-500 text-white w-[180px] h-[40px] rounded hover:bg-blue-600"
              onClick={() => {
                router.push(`/add-billing?customer_id=${customer.customer_id}`);
              }}
            >
              Add Billing
            </button>
          </div>
        )}
        {customer.billing && <BillingDetails {...customer.billing} />}
      </div>
    </div>
  );
}
