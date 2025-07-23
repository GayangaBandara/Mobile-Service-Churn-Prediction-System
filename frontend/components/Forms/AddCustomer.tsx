"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

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
        .get(`http://localhost:8000/customers/${customerIdFromUrl}`)
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
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
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
          `http://localhost:8000/customers/${form.customer_id}`,
          form
        );
        alert("Customer updated successfully!");
      } else {
        await axios.post("http://localhost:8000/customers", form);
        alert("Customer added successfully!");
      }
      if (isEditMode) {
        router.push(`/customers/${customerIdFromUrl}`);
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Error submitting customer:", error);
      alert("Failed to submit customer.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        {isEditMode ? "Edit Customer" : "Add Customer"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label>Customer ID</label>
          {isEditMode && (
            <input
              name="customer_id"
              className="w-full p-2 border rounded bg-gray-100"
              value={form.customer_id}
              readOnly
            />
          )}
          {!isEditMode && (
            <input
              name="customer_id"
              className="w-full p-2 border rounded bg-gray-100"
              value={form.customer_id}
              onChange={handleChange}
            />
          )}
        </div>

        <div className="flex flex-col">
          <label>Gender</label>
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="flex gap-10">
          <label>
            Married
            <input
              type="checkbox"
              name="married"
              checked={form.married}
              onChange={handleChange}
            />
          </label>
          <label>
            Dependents
            <input
              type="checkbox"
              name="dependents"
              checked={form.dependents}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="flex flex-col">
          <label>Number of Dependents</label>
          <input
            name="number_of_dependents"
            type="number"
            value={form.number_of_dependents}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="flex gap-6 items-center">
          <label>
            Partner
            <input
              type="checkbox"
              name="partner"
              checked={form.partner}
              onChange={handleChange}
            />
          </label>
          <label>
            Senior Citizen
            <input
              type="checkbox"
              name="senior_citizen"
              checked={form.senior_citizen}
              onChange={handleChange}
            />
          </label>
          <label>
            Under 30
            <input
              type="checkbox"
              name="under_30"
              checked={form.under_30}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="flex flex-col">
          <label>Age</label>
          <input
            name="age"
            type="number"
            value={form.age}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="flex flex-col">
          <label>Satisfaction Score</label>
          <input
            name="satisfaction_score"
            type="number"
            value={form.satisfaction_score}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="flex flex-col">
          <label>CLTV</label>
          <input
            name="cltv"
            type="number"
            value={form.cltv}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="flex flex-col">
          <label>Customer Status</label>
          <select
            name="customer_status"
            value={form.customer_status}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Status</option>
            <option value="Stayed">Stayed</option>
            <option value="Churned">Churned</option>
            <option value="Joined">Joined</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label>Zip Code</label>
          <input
            name="zip_code"
            value={form.zip_code}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {isEditMode ? "Update Customer" : "Submit"}
        </button>
      </form>
    </div>
  );
}
