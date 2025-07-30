// components/ServicesDetails.tsx
import { useRouter } from "next/navigation";
import React from "react";
import "../../styles/components/details/ServicesDetails.css";

type ServicesDetailsProps = {
  customer_id: string;
  internet_service: boolean;
  internet_type: string;
  phone_service: boolean;
  multiple_lines: boolean;
  online_backup: boolean;
  online_security: boolean;
  streaming_tv: boolean;
  streaming_music: boolean;
  streaming_movies: boolean;
  device_protection_plan: boolean;
  premium_tech_support: boolean;
  unlimited_data: boolean;
};

const ServicesDetails: React.FC<ServicesDetailsProps> = ({
  customer_id,
  internet_service,
  internet_type,
  phone_service,
  multiple_lines,
  online_backup,
  online_security,
  streaming_tv,
  streaming_music,
  streaming_movies,
  device_protection_plan,
  premium_tech_support,
  unlimited_data,
}) => {
  
  const router = useRouter();

  return (
    <div className="services-card">
      <h2 className="services-title">Services Details</h2>
      <div className="services-grid">
        <div className="services-item">
          <span className="services-label">Internet Service:</span>
          <span className="services-value">{internet_service ? "Yes" : "No"}</span>
        </div>
        <div className="services-item">
          <span className="services-label">Internet Type:</span>
          <span className="services-value">{internet_type}</span>
        </div>
        <div className="services-item">
          <span className="services-label">Phone Service:</span>
          <span className="services-value">{phone_service ? "Yes" : "No"}</span>
        </div>
        <div className="services-item">
          <span className="services-label">Multiple Lines:</span>
          <span className="services-value">{multiple_lines ? "Yes" : "No"}</span>
        </div>
        <div className="services-item">
          <span className="services-label">Online Backup:</span>
          <span className="services-value">{online_backup ? "Yes" : "No"}</span>
        </div>
        <div className="services-item">
          <span className="services-label">Online Security:</span>
          <span className="services-value">{online_security ? "Yes" : "No"}</span>
        </div>
        <div className="services-item highlight">
          <span className="services-label">Streaming TV:</span>
          <span className="services-value">{streaming_tv ? "Yes" : "No"}</span>
        </div>
        <div className="services-item highlight">
          <span className="services-label">Streaming Music:</span>
          <span className="services-value">{streaming_music ? "Yes" : "No"}</span>
        </div>
        <div className="services-item highlight">
          <span className="services-label">Streaming Movies:</span>
          <span className="services-value">{streaming_movies ? "Yes" : "No"}</span>
        </div>
        <div className="services-item">
          <span className="services-label">Device Protection Plan:</span>
          <span className="services-value">{device_protection_plan ? "Yes" : "No"}</span>
        </div>
        <div className="services-item">
          <span className="services-label">Premium Tech Support:</span>
          <span className="services-value">{premium_tech_support ? "Yes" : "No"}</span>
        </div>
        <div className="services-item">
          <span className="services-label">Unlimited Data:</span>
          <span className="services-value">{unlimited_data ? "Yes" : "No"}</span>
        </div>
      </div>

      <div className="services-actions">
        <button
          className="edit-button"
          onClick={() =>
            router.push(`/add-services?customer_id=${customer_id}&edit=true`)
          }
        >
          Edit Services
        </button>
      </div>
    </div>
  );
};

export default ServicesDetails;
