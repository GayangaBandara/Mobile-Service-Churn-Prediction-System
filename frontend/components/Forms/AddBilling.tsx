"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";

const AddBillingForm: React.FC = () => {
  const searchParams = useSearchParams();
  const customerIdFromUrl = searchParams.get("customer_id") || "";
  const isEditMode = searchParams.get("edit") === "true";

  // types
  type BillingForm = {
    customer_id: string;
    contract: string;
    monthly_charge: string;
    total_charges: string;
    payment_method: string;
    paperless_billing: boolean;
    offer: string;
    total_revenue: string;
    total_refunds: string;
    total_extra_data_charges: string;
    total_long_distance_charges: string;
    avg_monthly_long_distance_charges: string;
    avg_monthly_gb_download: string;
  };

  // forms
  const [form, setForm] = useState<BillingForm>({
    customer_id: customerIdFromUrl,
    contract: "",
    monthly_charge: "",
    total_charges: "",
    payment_method: "",
    paperless_billing: false,
    offer: "",
    total_revenue: "",
    total_refunds: "",
    total_extra_data_charges: "",
    total_long_distance_charges: "",
    avg_monthly_long_distance_charges: "",
    avg_monthly_gb_download: "",
  });

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      customer_id: customerIdFromUrl,
    }));
  }, [customerIdFromUrl]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const fieldValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setForm((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));
  };

  useEffect(() => {
    if (isEditMode && customerIdFromUrl) {
      axios
        .get(`http://localhost:8000/billing/${customerIdFromUrl}`)
        .then((res) => setForm(res.data))
        .catch(console.error);
    }
  }, [customerIdFromUrl, isEditMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const numericFields = [
        "monthly_charge",
        "total_charges",
        "total_revenue",
        "total_refunds",
        "total_extra_data_charges",
        "total_long_distance_charges",
        "avg_monthly_long_distance_charges",
        "avg_monthly_gb_download",
      ];

      const payload: { [key: string]: string | number | boolean } = {
        ...form,
      };

      numericFields.forEach((field) => {
        payload[field] = parseFloat(form[field as keyof BillingForm] as string);
      });

      await axios.post("http://localhost:8000/billing", payload);
      alert("Billing record added successfully!");
    } catch (err) {
      console.error("Error adding billing", err);
      alert("Failed to add billing.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow p-6 mt-10 rounded-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Add Billing</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="customer_id"
          value={form.customer_id}
          readOnly
          className="border p-2 rounded bg-gray-100"
        />
        <input
          type="text"
          name="contract"
          value={form.contract}
          onChange={handleChange}
          placeholder="Contract"
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="monthly_charge"
          value={form.monthly_charge}
          onChange={handleChange}
          placeholder="Monthly Charge"
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="total_charges"
          value={form.total_charges}
          onChange={handleChange}
          placeholder="Total Charges"
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="payment_method"
          value={form.payment_method}
          onChange={handleChange}
          placeholder="Payment Method"
          className="border p-2 rounded"
        />
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="paperless_billing"
            checked={form.paperless_billing}
            onChange={handleChange}
          />
          <label htmlFor="paperless_billing">Paperless Billing</label>
        </div>
        <input
          type="text"
          name="offer"
          value={form.offer}
          onChange={handleChange}
          placeholder="Offer"
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="total_revenue"
          value={form.total_revenue}
          onChange={handleChange}
          placeholder="Total Revenue"
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="total_refunds"
          value={form.total_refunds}
          onChange={handleChange}
          placeholder="Total Refunds"
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="total_extra_data_charges"
          value={form.total_extra_data_charges}
          onChange={handleChange}
          placeholder="Extra Data Charges"
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="total_long_distance_charges"
          value={form.total_long_distance_charges}
          onChange={handleChange}
          placeholder="Long Distance Charges"
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="avg_monthly_long_distance_charges"
          value={form.avg_monthly_long_distance_charges}
          onChange={handleChange}
          placeholder="Avg Long Distance Charges"
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="avg_monthly_gb_download"
          value={form.avg_monthly_gb_download}
          onChange={handleChange}
          placeholder="Avg GB Download"
          className="border p-2 rounded"
        />

        <div className="col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Add Billing
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBillingForm;
