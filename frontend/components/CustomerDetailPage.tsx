"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import ProfileDetails from "./Details/ProfileDetails";
import LocationDetails from "./Details/LocationDetails";
import ServicesDetails from "./Details/ServicesDetails";
import BillingDetails from "./Details/BillingDetails";
import InsightsPanel from "./CustomerInsights";
import "../styles/components/CustomerDetailPage.css";

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
          `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000"}/customers/${customer_id}`
        );
        setCustomer(res.data);
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
      setInsights({
        churn_score: customer.churn_score,
        churn_value: customer.churn_value,
      });
    }
  }, [customer]);

  const handlePredict = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000"}/predictions/${customer_id}`
      );

      const prediction = res.data;

      setInsights({
        churn_score: prediction.churn_score,
        churn_value: prediction.churn_value,
      });
    } catch (err) {
      console.error("Error predicting churn", err);
      alert("Failed to predict churn insights.");
    }
  };

  if (!customer) return <div className="loading-state">Loading...</div>;

  return (
    <div className="customer-detail-container bg-gray-50 min-h-screen pb-10">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <h1 className="customer-detail-title text-2xl font-bold text-gray-900 mb-6">
          Customer Details: {customer.customer_id}
        </h1>
      </div>

      {/* Insights */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        {insights && <InsightsPanel insights={insights} />}
      </div>

      {/* Predict Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="predict-button-container bg-white rounded-lg shadow-sm p-6">
          <button
            onClick={handlePredict}
            className="predict-button bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
          >
            Predict Insights
          </button>
        </div>
      </div>

      {/* Profile & Location in same row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-col md:flex-row gap-6">
          {profile && (
            <div className="flex-1 detail-card">
              <ProfileDetails {...profile} />
            </div>
          )}
          {customer.location && (
            <div className="flex-1 detail-card">
              <LocationDetails customer_id={customer.customer_id} {...customer.location} />
            </div>
          )}
        </div>
      </div>

      {/* Services & Billing */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-6">
          {!customer.services ? (
            <div className="empty-card">
              <p className="empty-card-title text-xl font-semibold mb-4">Services</p>
              <button
                className="add-button"
                onClick={() => router.push(`/add-services?customer_id=${customer.customer_id}`)}
              >
                Add Services
              </button>
            </div>
          ) : (
            <ServicesDetails customer_id={customer.customer_id} {...customer.services} />
          )}

          {!customer.billing ? (
            <div className="empty-card">
              <p className="empty-card-title text-xl font-semibold mb-4">Billing</p>
              <button
                className="add-button"
                onClick={() => router.push(`/add-billing?customer_id=${customer.customer_id}`)}
              >
                Add Billing
              </button>
            </div>
          ) : (
            <BillingDetails customer_id={customer.customer_id} {...customer.billing} />
          )}
        </div>
      </div>
    </div>
  );
}
