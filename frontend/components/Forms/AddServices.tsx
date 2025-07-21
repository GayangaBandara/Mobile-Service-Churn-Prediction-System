"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";

const AddServicesForm: React.FC = () => {
  const searchParams = useSearchParams();
  const customerIdFromUrl = searchParams.get("customer_id") || "";

  const [form, setForm] = useState({
    customer_id: customerIdFromUrl,
    internet_service: "",
    internet_type: "",
    phone_service: false,
    multiple_lines: false,
    online_backup: false,
    online_security: false,
    streaming_tv: false,
    streaming_music: false,
    streaming_movies: false,
    device_protection_plan: false,
    premium_tech_support: false,
    unlimited_data: false,
  });

  // Ensure customer_id is set from URL on mount
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
    const isCheckbox = type === "checkbox";
    const checked =
      isCheckbox && "checked" in e.target
        ? (e.target as HTMLInputElement).checked
        : undefined;

    setForm((prev) => ({
      ...prev,
      [name]: isCheckbox ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/services", form);
      alert("Services record added successfully!");
    } catch (err) {
      console.error("Error adding services", err);
      alert("Failed to add services.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow p-6 mt-10 rounded-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Add Services</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {/* No need for user to edit this */}
        <input
          type="text"
          name="customer_id"
          value={form.customer_id}
          readOnly
          className="border p-2 rounded bg-gray-100"
        />
        <input
          type="text"
          name="internet_service"
          value={form.internet_service}
          onChange={handleChange}
          placeholder="Internet Service"
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="internet_type"
          value={form.internet_type}
          onChange={handleChange}
          placeholder="Internet Type"
          className="border p-2 rounded"
        />
        <div></div>
        {[
          "phone_service",
          "multiple_lines",
          "online_backup",
          "online_security",
          "streaming_tv",
          "streaming_music",
          "streaming_movies",
          "device_protection_plan",
          "premium_tech_support",
          "unlimited_data",
        ].map((field) => (
          <div key={field} className="flex items-center space-x-2">
            <input
              type="checkbox"
              name={field}
              checked={(form as any)[field]}
              onChange={handleChange}
            />
            <label htmlFor={field} className="capitalize">
              {field.replace(/_/g, " ")}
            </label>
          </div>
        ))}

        <div className="col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Add Services
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddServicesForm;
