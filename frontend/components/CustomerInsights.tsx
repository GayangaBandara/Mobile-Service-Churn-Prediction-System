"use client";

import React from "react";

interface Insights {
  churn_category: string;
  churn_label: string;
  churn_reason: string;
  churn_score: number;
  churn_value: number;
}

interface InsightsPanelProps {
  insights: Insights | null;
}

const InsightsPanel: React.FC<InsightsPanelProps> = ({ insights}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mt-10 w-full max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Churn Insights</h2>
      </div>

      {insights ? (
        <div className="grid grid-cols-2 gap-4 text-gray-700">
          <div>
            <p className="font-semibold">Churn Category:</p>
            <p>{insights.churn_category}</p>
          </div>
          <div>
            <p className="font-semibold">Churn Label:</p>
            <p>{insights.churn_label}</p>
          </div>
          <div>
            <p className="font-semibold">Churn Reason:</p>
            <p>{insights.churn_reason}</p>
          </div>
          <div>
            <p className="font-semibold">Churn Score:</p>
            <p>{insights.churn_score}</p>
          </div>
          <div>
            <p className="font-semibold">Churn Value:</p>
            <p>{insights.churn_value}</p>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">No churn insights available for this customer.</p>
      )}
    </div>
  );
};

export default InsightsPanel;
