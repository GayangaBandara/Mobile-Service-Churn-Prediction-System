"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import "../../styles/components/forms/AddServices.css";

const AddServicesForm: React.FC = () => {
  const searchParams = useSearchParams();
  const customerIdFromUrl = searchParams.get("customer_id") || "";
  const isEditMode = searchParams.get("edit") === "true";

  const [form, setForm] = useState({
    customer_id: customerIdFromUrl,
    internet_service: false,
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

  const router = useRouter();

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      customer_id: customerIdFromUrl,
    }));
  }, [customerIdFromUrl]);

  useEffect(() => {
    if (isEditMode && customerIdFromUrl) {
      axios
        .get(`http://127.0.0.1:8000/services/${customerIdFromUrl}`)
        .then((res) => setForm(res.data))
        .catch((err) => {
          console.error("Failed to fetch service data", err);
          alert("Unable to fetch services for edit.");
        });
    }
  }, [isEditMode, customerIdFromUrl]);

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
      if (isEditMode) {
        await axios.put(
          `http://127.0.0.1:8000/services/${form.customer_id}`,
          form
        );
        alert("Services updated successfully!");
        router.push(`/customers/${customerIdFromUrl}`);
      } else {
        await axios.post("http://localhost:8000/services", form);
        alert("Services added successfully!");
        router.push(`/customers/${customerIdFromUrl}`);
      }
    } catch (err) {
      console.error("Error submitting services", err);
      alert("Failed to submit services.");
    }
  };

  return (
    <div className="services-form-container">
      <h2 className="services-form-title">
        {isEditMode ? "Edit Services" : "Add Services"}
      </h2>
      <form onSubmit={handleSubmit} className="services-form">
        <input
          type="text"
          name="customer_id"
          value={form.customer_id}
          readOnly
          className="services-form-input services-form-input-readonly"
        />
        <select
          name="internet_type"
          value={form.internet_type}
          onChange={handleChange}
          className="services-form-select"
        >
          <option value="">Select Internet Type</option>
          <option value="Fiber Optic">Fiber Optic</option>
          <option value="DSL">DSL</option>
          <option value="Cable">Cable</option>
          <option value="None">None</option>
        </select>

        <div></div>
        
        <div className="service-category">
          <h3 className="service-category-title">Internet & Phone Services</h3>
        </div>
        
        {[
          "internet_service",
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
          <div key={field} className="services-form-checkbox-container">
            <input
              type="checkbox"
              name={field}
              checked={(form as any)[field]}
              onChange={handleChange}
              className="services-form-checkbox"
            />
            <label htmlFor={field} className="services-form-label">
              {field.replace(/_/g, " ")}
            </label>
          </div>
        ))}

        <div className="services-form-button-container">
          <button
            type="submit"
            className="services-form-button"
          >
            {isEditMode ? "Update Services" : "Add Services"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddServicesForm;
