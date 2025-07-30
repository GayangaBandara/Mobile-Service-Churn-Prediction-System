import { useRouter } from "next/navigation";
import React from "react";
import "../../styles/components/details/ProfileDetails.css";

type ProfileDetailsProps = {
  customer_id: string;
  gender: string;
  married: boolean;
  dependents: boolean;
  number_of_dependents: number;
  partner: boolean;
  senior_citizen: boolean;
  under_30: boolean;
  age?: number;
  satisfaction_score: number;
  cltv: number;
  customer_status: string;
};

const ProfileDetails: React.FC<ProfileDetailsProps> = ({
  customer_id,
  gender,
  married,
  dependents,
  number_of_dependents,
  partner,
  senior_citizen,
  under_30,
  age,
  satisfaction_score,
  cltv,
  customer_status,
}) => {
  const router = useRouter();

  return (
    <div className="profile-card">
      <h2 className="profile-title">Customer Details</h2>
      <div className="profile-grid">
        <div className="profile-item">
          <span className="profile-label">Customer ID:</span>
          <span className="profile-value">{customer_id}</span>
        </div>
        <div className="profile-item">
          <span className="profile-label">Gender:</span>
          <span className="profile-value">{gender}</span>
        </div>
        <div className="profile-item">
          <span className="profile-label">Married:</span>
          <span className="profile-value">{married ? "Yes" : "No"}</span>
        </div>
        <div className="profile-item">
          <span className="profile-label">Dependents:</span>
          <span className="profile-value">{dependents ? "Yes" : "No"}</span>
        </div>
        <div className="profile-item">
          <span className="profile-label">Number of Dependents:</span>
          <span className="profile-value">{number_of_dependents}</span>
        </div>
        <div className="profile-item">
          <span className="profile-label">Partner:</span>
          <span className="profile-value">{partner ? "Yes" : "No"}</span>
        </div>
        <div className="profile-item">
          <span className="profile-label">Senior Citizen:</span>
          <span className="profile-value">{senior_citizen ? "Yes" : "No"}</span>
        </div>
        <div className="profile-item">
          <span className="profile-label">Under 30:</span>
          <span className="profile-value">{under_30 ? "Yes" : "No"}</span>
        </div>
        <div className="profile-item">
          <span className="profile-label">Age:</span>
          <span className="profile-value">{age ?? "N/A"}</span>
        </div>
        <div className="profile-item highlight">
          <span className="profile-label">Satisfaction Score:</span>
          <span className="profile-value">{satisfaction_score}/5</span>
        </div>
        <div className="profile-item highlight">
          <span className="profile-label">CLTV:</span>
          <span className="profile-value">${cltv.toFixed(2)}</span>
        </div>
        <div className="profile-item">
          <span className="profile-label">Status:</span>
          <span className="profile-value">{customer_status}</span>
        </div>
      </div>

      <div className="profile-actions">
        <button
          className="edit-button"
          onClick={() =>
            router.push(`/add-customer?customer_id=${customer_id}&edit=true`)
          }
        >
          Edit Customer
        </button>
      </div>
    </div>
  );
};

export default ProfileDetails;
