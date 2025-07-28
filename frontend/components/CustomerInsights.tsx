"use client";

import React from "react";
import "../styles/components/CustomerInsights.css";

interface Insights {
  churn_score: number;
  churn_value: number;
}

interface InsightsPanelProps {
  insights: Insights | null;
}

const InsightsPanel: React.FC<InsightsPanelProps> = ({ insights}) => {
  // Determine risk level classes based on churn score
  const getChurnScoreClass = (score: number) => {
    if (score < 30) return "low-risk";
    if (score < 70) return "medium-risk";
    return "high-risk";
  };

  return (
    <div className="insights-panel">
      <div className="insights-header">
        <h2 className="insights-title">Churn Insights</h2>
      </div>

      {insights ? (
        <div className="insights-grid">
          <div className="insight-item">
            <p className="insight-label">Churn Score:</p>
            <p className={`insight-value ${getChurnScoreClass(insights.churn_score)}`}>
              {insights.churn_score}
            </p>
          </div>
          <div className="insight-item">
            <p className="insight-label">Churn Value:</p>
            <p className="insight-value">{insights.churn_value}</p>
          </div>
        </div>
      ) : (
        <p className="no-insights">No churn insights available for this customer.</p>
      )}
    </div>
  );
};

export default InsightsPanel;
