// components/BillingDetails.tsx
import { useRouter } from "next/navigation";
import React from "react";

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
    <div className=" bg-white shadow-lg rounded-lg m-8 p-6 h-[400px]">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Billing Details</h2>
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
        <div>
          <strong>Contract:</strong> {contract}
        </div>
        <div>
          <strong>Monthly Charge:</strong> ${monthly_charge.toFixed(2)}
        </div>
        <div>
          <strong>Total Charges:</strong> ${total_charges.toFixed(2)}
        </div>
        <div>
          <strong>Payment Method:</strong> {payment_method}
        </div>
        <div>
          <strong>Paperless Billing:</strong> {paperless_billing ? "Yes" : "No"}
        </div>
        <div>
          <strong>Offer:</strong> {offer}
        </div>
        <div>
          <strong>Total Revenue:</strong> ${total_revenue.toFixed(2)}
        </div>
        <div>
          <strong>Total Refunds:</strong> ${total_refunds.toFixed(2)}
        </div>
        <div>
          <strong>Extra Data Charges:</strong> $
          {total_extra_data_charges.toFixed(2)}
        </div>
        <div>
          <strong>Long Distance Charges:</strong> $
          {total_long_distance_charges.toFixed(2)}
        </div>
        <div>
          <strong>Avg Monthly Long Distance:</strong> $
          {avg_monthly_long_distance_charges.toFixed(2)}
        </div>
        <div>
          <strong>Avg Monthly GB Download:</strong>{" "}
          {avg_monthly_gb_download.toFixed(2)} GB
        </div>
      </div>
      <button
        className="bg-yellow-500 text-white px-4 py-1 rounded"
        onClick={() =>
          router.push(`/add-billing?customer_id=${customer_id}&edit=true`)
        }
      >
        Edit Billing
      </button>
    </div>
  );
};

export default BillingDetails;
