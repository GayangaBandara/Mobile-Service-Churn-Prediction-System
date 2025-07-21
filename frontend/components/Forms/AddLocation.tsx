"use client";

import React, { useState } from "react";
import axios from "axios";

const AddLocationForm: React.FC = () => {
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

    try {
      const payload = {
        ...form,
        latitude: parseFloat(form.latitude),
        longitude: parseFloat(form.longitude),
        population: parseInt(form.population, 10),
      };

      const res = await axios.post("http://localhost:8000/locations", payload);
      alert("Location added successfully!");
      console.log("Created:", res.data);
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
      alert("Failed to add location");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Add Location</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="zip_code"
          placeholder="Zip Code"
          value={form.zip_code}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={form.state}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={form.country}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="latitude"
          placeholder="Latitude"
          value={form.latitude}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="longitude"
          placeholder="Longitude"
          value={form.longitude}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="lat_long"
          placeholder="Lat / Long"
          value={form.lat_long}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="population"
          placeholder="Population"
          value={form.population}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <div className="col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Add Location
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddLocationForm;
