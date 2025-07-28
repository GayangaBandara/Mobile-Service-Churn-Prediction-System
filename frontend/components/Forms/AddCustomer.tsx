"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { UserPlus } from "lucide-react";
import "../../styles/components/forms/AddCustomer.css";

interface CustomerFormData {
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
  cltv?: number;
  customer_status?: string;
  zip_code?: string;
}

export default function AddCustomer() {
  const searchParams = useSearchParams();
  const customerIdFromUrl = searchParams.get("customer_id") || "";
  const isEditMode = searchParams.get("edit") === "true";

  const [form, setForm] = useState<CustomerFormData>({
    customer_id: customerIdFromUrl,
    gender: "",
    married: false,
    dependents: false,
    number_of_dependents: 0,
    partner: false,
    senior_citizen: false,
    under_30: false,
    age: 0,
    satisfaction_score: 0,
    cltv: 0,
    customer_status: "",
    zip_code: "",
  });

  const router = useRouter();

  useEffect(() => {
    if (isEditMode && customerIdFromUrl) {
      axios
        .get(`http://127.0.0.1:8000/customers/${customerIdFromUrl}`)
        .then((res) => setForm(res.data))
        .catch((err) => {
          console.error("Failed to fetch customer data", err);
          alert("Unable to fetch customer data for edit.");
        });
    }
  }, [isEditMode, customerIdFromUrl]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value, type } = target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (target as HTMLInputElement).checked
          : type === "number"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await axios.put(
          `http://127.0.0.1:8000/customers/${form.customer_id}`,
          form
        );
        alert("✅ Customer updated successfully!");
        router.push(`/customers/${customerIdFromUrl}`);
      } else {
        await axios.post("http://127.0.0.1:8000/customers", form);
        alert("✅ Customer added successfully!");
        router.push("/");
      }
    } catch (error) {
      console.error("Error submitting customer:", error);
      alert("❌ Failed to submit customer.");
    }
  };

  return (
    <div className="form-page">
      <div className="form-container">
        <div className="form-header">
          <UserPlus className="form-header-icon" size={26} />
          <h2 className="form-title">
            {isEditMode ? "Edit Customer" : "Add Customer"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="form">
          {/* Customer ID */}
          <div className="form-field">
            <label className="form-label">Customer ID</label>
            <input
              name="customer_id"
              readOnly={isEditMode}
              value={form.customer_id}
              onChange={handleChange}
              className={`form-input ${isEditMode ? 'form-input-readonly' : ''}`}
              required
            />
          </div>

          {/* Gender */}
          <div className="form-field">
            <label className="form-label">Gender</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Checkboxes */}
          <div className="checkbox-grid">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="married"
                checked={form.married}
                onChange={handleChange}
              />
              Married
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="dependents"
                checked={form.dependents}
                onChange={handleChange}
              />
              Has Dependents
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="partner"
                checked={form.partner}
                onChange={handleChange}
              />
              Has Partner
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="senior_citizen"
                checked={form.senior_citizen}
                onChange={handleChange}
              />
              Senior Citizen
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="under_30"
                checked={form.under_30}
                onChange={handleChange}
              />
              Under 30
            </label>
          </div>

          {/* Numeric Fields */}
          <div className="numeric-fields-grid">
            <div className="form-field">
              <label className="form-label">Number of Dependents</label>
              <input
                name="number_of_dependents"
                type="number"
                value={form.number_of_dependents}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-field">
              <label className="form-label">Age</label>
              <input
                name="age"
                type="number"
                value={form.age}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-field">
              <label className="form-label">Satisfaction Score</label>
              <input
                name="satisfaction_score"
                type="number"
                value={form.satisfaction_score}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-field">
              <label className="form-label">CLTV</label>
              <input
                name="cltv"
                type="number"
                value={form.cltv}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>

          {/* Status + Zip */}
          <div className="form-field">
            <label className="form-label">Customer Status</label>
            <select
              name="customer_status"
              value={form.customer_status}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Select Status</option>
              <option value="Stayed">Stayed</option>
              <option value="Churned">Churned</option>
              <option value="Joined">Joined</option>
            </select>
          </div>

          <div className="form-field">
            <label className="form-label">Zip Code</label>
            <input
              name="zip_code"
              value={form.zip_code}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="submit-button"
          >
            {isEditMode ? "Update Customer" : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
