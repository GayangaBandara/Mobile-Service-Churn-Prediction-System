"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

export default function CustomerDetailPage() {
  const { customer_id } = useParams();
  const [customer, setCustomer] = useState<any>(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/customers/${customer_id}`);
        console.log(res.data)
        setCustomer(res.data);
      } catch (err) {
        console.error("Error loading customer", err);
      }
    };
    fetchCustomer();
  }, [customer_id]);

  if (!customer) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Customer Detail: {customer.customer_id}</h1>
      
      {/* Profile */}
      <section className="mb-6">
        <h2 className="font-semibold text-lg">👤 Profile</h2>
        <p>Status: {customer.customer_status}</p>
        <p>Gender: {customer.gender}</p>
        <p>Age: {customer.age}</p>
        <p>CLTV: {customer.cltv}</p>
        <p>Churn Score: {customer.churn_score}</p>
      </section>

      {/* Location */}
      <section className="mb-6">
        <h2 className="font-semibold text-lg">📍 Location</h2>
        {customer.location && (
          <>
            <p>City: {customer.location.city}</p>
            <p>State: {customer.location.state}</p>
            <p>Country: {customer.location.country}</p>
            <p>Lat/Long: {customer.location.lat_long}</p>
          </>
        )}
      </section>
      
      {/* Services */}
      <section className="mb-6">
        <h2 className="font-semibold text-lg">📶 Services</h2>
        {customer.services && (
          <ul className="list-disc ml-6">
            <li>Internet: {customer.services.internet_service} ({customer.services.internet_type})</li>
            <li>Phone Service: {customer.services.phone_service ? "Yes" : "No"}</li>
            <li>Streaming TV: {customer.services.streaming_tv ? "Yes" : "No"}</li>
            {/* Add more services */}
          </ul>
        )}
      </section>
      
      {/* Billing */}
      <section>
        <h2 className="font-semibold text-lg">💳 Billing</h2>
        {customer.billing && (
          <>
            <p>Contract: {customer.billing.contract}</p>
            <p>Monthly Charge: ${customer.billing.monthly_charge}</p>
            <p>Total Charges: ${customer.billing.total_charges}</p>
          </>
        )}
      </section>
    </div>
  );
}
