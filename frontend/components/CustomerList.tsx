"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Customer {
  customer_id: string;
  gender?: string;
  married?: boolean;
  dependents?: boolean;
  number_of_dependents?: number;
  partner?: boolean;
  senior_citizen?: boolean;
  under_30?: boolean;
  age?: number;
  satisfaction_score?: number;
  churn_score?: number;
  cltv?: number;
  churn_label?: string;
  churn_value?: number;
  churn_reason?: string | null;
  churn_category?: string | null;
  customer_status?: string;
  zip_code?: string;
}

export default function CustomerList() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/customers");
        setCustomers(response.data);
      } catch (error) {
        console.error("Failed to load customers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8000/customers/${id}`);
      setCustomers((prev) => prev.filter((c) => c.customer_id !== id));
    } catch (error) {
      console.error("Failed to delete customer:", error);
    }
  };

  const handleView = (id: string) => {
    router.push(`/customers/${id}`);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">Customers</h1>
        <button
          className="bg-green-500 text-white w-[180px] h-[40px] rounded hover:bg-green-600"
          onClick={() => {
            router.push("/add-customer");
          }}
        >
          Add Customer
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-auto">
          <table className="min-w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Gender</th>
                <th className="border px-4 py-2">Married</th>
                <th className="border px-4 py-2">Dependents</th>
                <th className="border px-4 py-2">CLTV</th>
                <th className="border px-4 py-2">Satisfaction</th>
                <th className="border px-4 py-2">Churn Score</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.customer_id} className="hover:bg-gray-300">
                  <td className="border text-center px-4 py-2">
                    {c.customer_id}
                  </td>
                  <td className="border text-center px-4 py-2">{c.gender}</td>
                  <td className="border text-center px-4 py-2">
                    {c.married ? "Yes" : "No"}
                  </td>
                  <td className="border text-center px-4 py-2">
                    {c.dependents ? "Yes" : "No"}
                  </td>
                  <td className="border text-center px-4 py-2">
                    {c.cltv?.toFixed(2)}
                  </td>
                  <td className="border text-center px-4 py-2">
                    {c.satisfaction_score}
                  </td>
                  <td className="border text-center px-4 py-2">
                    {c.churn_score ?? "N/A"}
                  </td>
                  <td className="border text-center px-4 py-2">
                    {c.customer_status}
                  </td>
                  <td className="border text-center py-2 space-x-2">
                    <button
                      className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                      onClick={() => handleView(c.customer_id)}
                    >
                      View
                    </button>
                    <button
                      className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
                      onClick={() => handleDelete(c.customer_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
