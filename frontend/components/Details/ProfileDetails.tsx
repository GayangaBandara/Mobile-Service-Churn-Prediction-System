import { useRouter } from "next/navigation";
import React from "react";

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
    <div className=" bg-white shadow-lg rounded-lg p-6 m-8 w-[500px] h-[350px]">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Customer Details
      </h2>
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
        <div>
          <strong>Customer ID:</strong> {customer_id}
        </div>
        <div>
          <strong>Gender:</strong> {gender}
        </div>
        <div>
          <strong>Married:</strong> {married ? "Yes" : "No"}
        </div>
        <div>
          <strong>Dependents:</strong> {dependents ? "Yes" : "No"}
        </div>
        <div>
          <strong>Number of Dependents:</strong> {number_of_dependents}
        </div>
        <div>
          <strong>Partner:</strong> {partner ? "Yes" : "No"}
        </div>
        <div>
          <strong>Senior Citizen:</strong> {senior_citizen ? "Yes" : "No"}
        </div>
        <div>
          <strong>Under 30:</strong> {under_30 ? "Yes" : "No"}
        </div>
        <div>
          <strong>Age:</strong> {age ?? "N/A"}
        </div>
        <div>
          <strong>Satisfaction Score:</strong> {satisfaction_score}/5
        </div>
        <div>
          <strong>CLTV:</strong> ${cltv.toFixed(2)}
        </div>
        <div>
          <strong>Status:</strong> {customer_status}
        </div>
      </div>

      <div className="flex w-full justify-center mt-3">
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded"
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
