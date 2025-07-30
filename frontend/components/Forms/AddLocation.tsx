"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { MapPin } from "lucide-react";
import "../../styles/components/forms/AddLocation.css";

const AddLocationForm: React.FC = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    zip_code: "",
    city: "",
    state: "",
    country: "",
    latitude: "",
    longitude: "",
    lat_long: "",
    population: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...form,
        latitude: parseFloat(form.latitude),
        longitude: parseFloat(form.longitude),
        population: parseInt(form.population, 10),
      };

      const res = await axios.post("http://127.0.0.1:8000/locations", payload);
      alert("✅ Location added successfully!");
      router.push("/");

      setForm({
        zip_code: "",
        city: "",
        state: "",
        country: "",
        latitude: "",
        longitude: "",
        lat_long: "",
        population: "",
      });
    } catch (err) {
      console.error("Error adding location", err);
      alert("❌ Failed to add location");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="location-form-page">
      <div className="location-form-container">
        <div className="location-form-header">
          <MapPin className="location-form-icon" size={28} />
          <h2 className="location-form-title">Add New Location</h2>
        </div>

        <p className="location-form-description">
          Fill out the form below to register a new location in the system.
        </p>

        <form
          onSubmit={handleSubmit}
          className="location-form"
        >
          <input
            type="text"
            name="zip_code"
            placeholder="Zip Code *"
            value={form.zip_code}
            onChange={handleChange}
            required
            className="location-form-input required"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            className="location-form-input"
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={form.state}
            onChange={handleChange}
            className="location-form-input"
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={form.country}
            onChange={handleChange}
            className="location-form-input"
          />
          <input
            type="number"
            step="any"
            name="latitude"
            placeholder="Latitude"
            value={form.latitude}
            onChange={handleChange}
            className="location-form-input"
          />
          <input
            type="number"
            step="any"
            name="longitude"
            placeholder="Longitude"
            value={form.longitude}
            onChange={handleChange}
            className="location-form-input"
          />
          <input
            type="text"
            name="lat_long"
            placeholder="Latitude, Longitude"
            value={form.lat_long}
            onChange={handleChange}
            className="location-form-input"
          />
          <input
            type="number"
            name="population"
            placeholder="Population"
            value={form.population}
            onChange={handleChange}
            className="location-form-input"
          />

          <div className="location-form-button-container">
            <button
              type="submit"
              disabled={loading}
              className={`location-form-button ${loading ? 'loading' : ''}`}
            >
              {loading ? "Adding Location..." : "Add Location"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLocationForm;
