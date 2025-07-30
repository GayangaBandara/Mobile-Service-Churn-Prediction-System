// components/BillingDetails.tsx
import { useRouter } from "next/navigation";
import React from "react";
import "../../styles/components/details/BillingDetails.css";

type BillingDetailsProps = {
  customer_id: string;
  contract: string;
  monthly_charge: number;
  total_charges: number;
  payment_method: string;
  paperless_billing: boolean;
  offer: string;
  total_revenue: number;
  total_refunds: number;
  total_extra_data_charges: number;
  total_long_distance_charges: number;
  avg_monthly_long_distance_charges: number;
  avg_monthly_gb_download: number;
};

const BillingDetails: React.FC<BillingDetailsProps> = ({
  customer_id,
  contract,
  monthly_charge,
  total_charges,
  payment_method,
  paperless_billing,
  offer,
  total_revenue,
  total_refunds,
  total_extra_data_charges,
  total_long_distance_charges,
  avg_monthly_long_distance_charges,
  avg_monthly_gb_download,
}) => {
  const router = useRouter();

  return (
    <div className="billing-card">
      <h2 className="billing-title">Billing Details</h2>
      <div className="billing-grid">
        <div className="billing-item">
          <span className="billing-label">Contract:</span>
          <span className="billing-value">{contract}</span>
        </div>
        <div className="billing-item">
          <span className="billing-label">Monthly Charge:</span>
          <span className="billing-value">${monthly_charge.toFixed(2)}</span>
        </div>
        <div className="billing-item">
          <span className="billing-label">Total Charges:</span>
          <span className="billing-value">${total_charges.toFixed(2)}</span>
        </div>
        <div className="billing-item">
          <span className="billing-label">Payment Method:</span>
          <span className="billing-value">{payment_method}</span>
        </div>
        <div className="billing-item">
          <span className="billing-label">Paperless Billing:</span>
          <span className="billing-value">{paperless_billing ? "Yes" : "No"}</span>
        </div>
        <div className="billing-item">
          <span className="billing-label">Offer:</span>
          <span className="billing-value">{offer}</span>
        </div>
        <div className="billing-item highlight">
          <span className="billing-label">Total Revenue:</span>
          <span className="billing-value">${total_revenue.toFixed(2)}</span>
        </div>
        <div className="billing-item">
          <span className="billing-label">Total Refunds:</span>
          <span className="billing-value">${total_refunds.toFixed(2)}</span>
        </div>
        <div className="billing-item">
          <span className="billing-label">Extra Data Charges:</span>
          <span className="billing-value">${total_extra_data_charges.toFixed(2)}</span>
        </div>
        <div className="billing-item">
          <span className="billing-label">Long Distance Charges:</span>
          <span className="billing-value">${total_long_distance_charges.toFixed(2)}</span>
        </div>
        <div className="billing-item">
          <span className="billing-label">Avg Monthly Long Distance:</span>
          <span className="billing-value">${avg_monthly_long_distance_charges.toFixed(2)}</span>
        </div>
        <div className="billing-item">
          <span className="billing-label">Avg Monthly GB Download:</span>
          <span className="billing-value">{avg_monthly_gb_download.toFixed(2)} GB</span>
        </div>
      </div>
      <div className="billing-actions">
        <button
          className="edit-button"
          onClick={() =>
            router.push(`/add-billing?customer_id=${customer_id}&edit=true`)
          }
        >
          Edit Billing
        </button>
      </div>
    </div>
  );
};

export default BillingDetails;
