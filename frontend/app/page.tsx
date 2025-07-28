"use client";

import CustomerList from "@/components/CustomerList";
import "../styles/pages/page.css";

export default function DashboardPage() {
  return (
    <div className="dashboard-container">
      <CustomerList />
    </div>
  );
}
