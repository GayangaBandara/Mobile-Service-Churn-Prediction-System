"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

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
  const [form, setForm] = useState<CustomerFormData>({
    customer_id: "",
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/customers",
        form
      );
      console.log("Success:", response.data);
      alert("Customer added successfully!");
      router.push("/"); 
    } catch (error) {
      console.error("Error adding customer:", error);
      alert("Failed to add customer.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add Customer</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col ">
          <label htmlFor="">Customer ID</label>
          <input
            name="customer_id"
            placeholder="Customer ID"
            className="w-full p-2 border rounded"
            value={form.customer_id}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col ">
          <label htmlFor="">Gender</label>
          <input
            name="gender"
            placeholder="Gender"
            className="w-full p-2 border rounded"
            value={form.gender}
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-10">
          <label className="block">
            Married{" "}
            <input
              type="checkbox"
              name="married"
              checked={form.married}
              onChange={handleChange}
            />
          </label>
          <label className="block">
            Dependents{" "}
            <input
              type="checkbox"
              name="dependents"
              checked={form.dependents}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="flex flex-col">
          <label htmlFor="">Number of dependants</label>
          <input
            name="number_of_dependents"
            type="number"
            placeholder="Number of Dependents"
            className="w-full p-2 border rounded"
            value={form.number_of_dependents}
            onChange={handleChange}
          />
        </div>

        <div className="flex gap-6 items-center">
          <label className="block">
            Partner{" "}
            <input
              type="checkbox"
              name="partner"
              checked={form.partner}
              onChange={handleChange}
            />
          </label>
          <label className="block">
            Senior Citizen{" "}
            <input
              type="checkbox"
              name="senior_citizen"
              checked={form.senior_citizen}
              onChange={handleChange}
            />
          </label>
          <label className="block">
            Under 30{" "}
            <input
              type="checkbox"
              name="under_30"
              checked={form.under_30}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="flex flex-col">
          <label htmlFor="">Age</label>
          <input
            name="age"
            type="number"
            placeholder="Age"
            className="w-full p-2 border rounded"
            value={form.age}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="">Satisfaction Score</label>
          <input
            name="satisfaction_score"
            type="number"
            placeholder="Satisfaction Score"
            className="w-full p-2 border rounded"
            value={form.satisfaction_score}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="">CLTV</label>
          <input
            name="cltv"
            type="number"
            placeholder="CLTV"
            className="w-full p-2 border rounded"
            value={form.cltv}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="">Customer Status</label>
          <input
            name="customer_status"
            placeholder="Customer Status"
            className="w-full p-2 border rounded"
            value={form.customer_status}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="">Zip Code</label>
          <input
          name="zip_code"
          placeholder="Zip Code"
          className="w-full p-2 border rounded"
          value={form.zip_code}
          onChange={handleChange}
        />
        </div>
        
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
