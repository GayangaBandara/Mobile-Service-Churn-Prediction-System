// components/ServicesDetails.tsx
import { useRouter } from "next/navigation";
import React from "react";

type ServicesDetailsProps = {
  customer_id: string;
  internet_service: string;
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
    <div className=" bg-white shadow-lg rounded-lg m-8 p-6 w-[520px] h-[400px]">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Services Details
      </h2>
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
        <div>
          <strong>Internet Service:</strong> {internet_service}
        </div>
        <div>
          <strong>Internet Type:</strong> {internet_type}
        </div>
        <div>
          <strong>Phone Service:</strong> {phone_service ? "Yes" : "No"}
        </div>
        <div>
          <strong>Multiple Lines:</strong> {multiple_lines ? "Yes" : "No"}
        </div>
        <div>
          <strong>Online Backup:</strong> {online_backup ? "Yes" : "No"}
        </div>
        <div>
          <strong>Online Security:</strong> {online_security ? "Yes" : "No"}
        </div>
        <div>
          <strong>Streaming TV:</strong> {streaming_tv ? "Yes" : "No"}
        </div>
        <div>
          <strong>Streaming Music:</strong> {streaming_music ? "Yes" : "No"}
        </div>
        <div>
          <strong>Streaming Movies:</strong> {streaming_movies ? "Yes" : "No"}
        </div>
        <div>
          <strong>Device Protection Plan:</strong>{" "}
          {device_protection_plan ? "Yes" : "No"}
        </div>
        <div>
          <strong>Premium Tech Support:</strong>{" "}
          {premium_tech_support ? "Yes" : "No"}
        </div>
        <div>
          <strong>Unlimited Data:</strong> {unlimited_data ? "Yes" : "No"}
        </div>
      </div>

      <div className="flex w-full justify-center mt-10">
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded"
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
