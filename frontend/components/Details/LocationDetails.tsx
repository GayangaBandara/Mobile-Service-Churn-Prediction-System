// components/LocationDetails.tsx
import { useRouter } from "next/navigation";
import React from "react";
import "../../styles/components/details/LocationDetails.css";

type LocationDetailsProps = {
  customer_id: string;
  zip_code: string;
  city: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
  lat_long?: string;
  population: number;
};

const LocationDetails: React.FC<LocationDetailsProps> = ({
  customer_id,
  zip_code,
  city,
  state,
  country,
  latitude,
  longitude,
  lat_long,
  population,
}) => {
  const router = useRouter();
  return (
    <div className="location-card">
      <h2 className="location-title">Location Details</h2>
      <div className="location-grid">
        <div className="location-item">
          <span className="location-label">ZIP Code:</span>
          <span className="location-value">{zip_code}</span>
        </div>
        <div className="location-item">
          <span className="location-label">City:</span>
          <span className="location-value">{city}</span>
        </div>
        <div className="location-item">
          <span className="location-label">State:</span>
          <span className="location-value">{state}</span>
        </div>
        <div className="location-item">
          <span className="location-label">Country:</span>
          <span className="location-value">{country}</span>
        </div>
        <div className="location-item">
          <span className="location-label">Latitude:</span>
          <span className="location-value">{latitude}</span>
        </div>
        <div className="location-item">
          <span className="location-label">Longitude:</span>
          <span className="location-value">{longitude}</span>
        </div>
        <div className="location-item">
          <span className="location-label">Lat/Long:</span>
          <span className="location-value">{lat_long ?? `${latitude}, ${longitude}`}</span>
        </div>
        <div className="location-item">
          <span className="location-label">Population:</span>
          <span className="location-value">{population}</span>
        </div>
      </div>
    </div>
  );
};

export default LocationDetails;
