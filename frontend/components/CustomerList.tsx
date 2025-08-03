"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { PlusCircle, MapPin } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import "../styles/components/CustomerList.css";

interface Customer {
  customer_id: string;
  gender?: string;
  married?: boolean;
  dependents?: boolean;
  number_of_dependents?: number;
  partner?: boolean;
  senior_citizen?: boolean;
  under_30?: boolean;
  age?: number;
  satisfaction_score?: number;
  churn_score?: number;
  cltv?: number;
  churn_label?: string;
  churn_value?: number;
  churn_reason?: string | null;
  churn_category?: string | null;
  customer_status?: string;
  zip_code?: string;
}

export default function CustomerList() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [locationCount, setLocationCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/customers");
        setCustomers(response.data);
      } catch (error) {
        console.error("Failed to load customers:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchLocations = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/locations");
        setLocationCount(res.data.length);
      } catch (err) {
        console.error("Failed to load locations:", err);
        setLocationCount(0);
      }
    };

    fetchCustomers();
    fetchLocations();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/customers/${id}`);
      setCustomers((prev) => prev.filter((c) => c.customer_id !== id));
    } catch (error) {
      console.error("Failed to delete customer:", error);
    }
  };

  const handleView = (id: string) => {
    router.push(`/customers/${id}`);
  };

  const churnData = [
    { name: "Stayed", value: customers.filter(c => c.customer_status === "Stayed").length },
    { name: "Churned", value: customers.filter(c => c.customer_status === "Churned").length },
    { name: "Joined", value: customers.filter(c => c.customer_status === "Joined").length },
  ];

  const COLORS = ["#10b981", "#ef4444", "#3b82f6"];

  const totalChurnScore = customers.reduce((sum, c) => sum + (c.churn_score ?? 0), 0);
  const avgChurnScore = customers.length ? (totalChurnScore / customers.length).toFixed(2) : "N/A";

  return (
    <div className="customer-container">
      {/* Analytics and Pie Chart Row */}
      <section className="analytics-section">
        {/* Left Side - Analytics Section (Vertical Stack) */}
        <div className="analytics-cards">
          <div className="analytics-card analytics-card-blue">
            <p className="analytics-card-label">Total Customers</p>
            <h2 className="analytics-card-value">{customers.length}</h2>
          </div>
          <div className="analytics-card analytics-card-green">
            <p className="analytics-card-label">Total Locations</p>
            <h2 className="analytics-card-value">{locationCount}</h2>
          </div>
          <div className="analytics-card analytics-card-purple">
            <p className="analytics-card-label">Avg. Churn Score</p>
            <h2 className="analytics-card-value">{avgChurnScore}</h2>
          </div>
        </div>

        {/* Right Side - Pie Chart Section */}
        <div className="chart-container">
          <h2 className="chart-title">Customer Churn Overview</h2>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart margin={{ bottom: 0 }}>
              <Pie
                data={churnData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {churnData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Button Row */}
      <section className="action-section">
        <h1 className="section-title">Customer Actions</h1>
        <div className="button-group">
          <button
            className="button button-blue"
            onClick={() => router.push("/add-location")}
          >
            <MapPin size={18} /> Add Location
          </button>
          {locationCount > 0 && (
            <button
              className="button button-green"
              onClick={() => router.push("/add-customer")}
            >
              <PlusCircle size={18} /> Add Customer
            </button>
          )}
        </div>
      </section>

      {/* Table Section */}
      <section className="table-section">
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
          </div>
        ) : (
          <table className="customer-table">
            <thead className="table-header">
              <tr>
                <th>ID</th>
                <th>Gender</th>
                <th>Married</th>
                <th>Dependents</th>
                <th>CLTV</th>
                <th>Satisfaction</th>
                <th>Churn Score</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.customer_id} className="table-row">
                  <td className="table-cell">{c.customer_id}</td>
                  <td className="table-cell">{c.gender ?? "-"}</td>
                  <td className="table-cell">{c.married ? "Yes" : "No"}</td>
                  <td className="table-cell">{c.dependents ? "Yes" : "No"}</td>
                  <td className="table-cell">{c.cltv?.toFixed(2)}</td>
                  <td className="table-cell">{c.satisfaction_score}</td>
                  <td className="table-cell">{c.churn_score ?? "N/A"}</td>
                  <td className="table-cell">{c.customer_status}</td>
                  <td className="table-cell">
                    <button
                      className="action-button view-button"
                      onClick={() => handleView(c.customer_id)}
                    >
                      View
                    </button>
                    <button
                      className="action-button delete-button"
                      onClick={() => handleDelete(c.customer_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}