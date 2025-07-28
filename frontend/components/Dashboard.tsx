"use client";

import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import axios from "axios";
import "../styles/components/Dashboard.css";

interface AnalyticsData {
  total_customers: number;
  customer_status: Array<{ name: string; value: number }>;
  gender_distribution: Array<{ name: string; value: number }>;
  age_groups: Array<{ name: string; value: number }>;
  churn_risk: Array<{ name: string; value: number }>;
  senior_distribution: Array<{ name: string; value: number }>;
  dependents_distribution: Array<{ name: string; value: number }>;
  average_metrics: {
    churn_score: number;
    satisfaction_score: number;
    cltv: number;
  };
}

interface ChurnTrends {
  satisfaction_vs_churn: Array<{
    satisfaction_range: string;
    avg_churn_score: number;
    customer_count: number;
  }>;
}

const COLORS = {
  primary: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'],
  churn: ['#10B981', '#F59E0B', '#EF4444'], // Green, Yellow, Red
  gender: ['#3B82F6', '#EC4899', '#6B7280'], // Blue, Pink, Gray
  age: ['#8B5CF6', '#06B6D4', '#F97316', '#84CC16'], // Purple, Cyan, Orange, Lime
};

const Dashboard: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [churnTrends, setChurnTrends] = useState<ChurnTrends | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      const [analyticsResponse, trendsResponse] = await Promise.all([
        axios.get("http://localhost:8000/analytics/dashboard"),
        axios.get("http://localhost:8000/analytics/churn-trends")
      ]);
      
      setAnalyticsData(analyticsResponse.data);
      setChurnTrends(trendsResponse.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching analytics data:", err);
      setError("Failed to load analytics data");
    } finally {
      setLoading(false);
    }
  };

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    if (percent < 0.05) return null; // Don't show labels for slices less than 5%
    
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="12"
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error-message">
          <p>{error}</p>
          <button onClick={fetchAnalyticsData} className="retry-button">
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!analyticsData) return null;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Customer Analytics Dashboard</h1>
        <p className="dashboard-subtitle">Comprehensive insights into customer behavior and churn patterns</p>
      </div>

      {/* Key Metrics Cards */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon">👥</div>
          <div className="metric-content">
            <h3>Total Customers</h3>
            <p className="metric-value">{analyticsData.total_customers.toLocaleString()}</p>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">📊</div>
          <div className="metric-content">
            <h3>Avg Churn Score</h3>
            <p className="metric-value">{analyticsData.average_metrics.churn_score}</p>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">⭐</div>
          <div className="metric-content">
            <h3>Avg Satisfaction</h3>
            <p className="metric-value">{analyticsData.average_metrics.satisfaction_score}</p>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">💰</div>
          <div className="metric-content">
            <h3>Avg CLTV</h3>
            <p className="metric-value">${analyticsData.average_metrics.cltv}</p>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="charts-grid">
        {/* Churn Risk Distribution */}
        <div className="chart-card">
          <h3 className="chart-title">Churn Risk Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analyticsData.churn_risk}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {analyticsData.churn_risk.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS.churn[index % COLORS.churn.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Gender Distribution */}
        <div className="chart-card">
          <h3 className="chart-title">Gender Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analyticsData.gender_distribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {analyticsData.gender_distribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS.gender[index % COLORS.gender.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Age Groups Distribution */}
        <div className="chart-card">
          <h3 className="chart-title">Age Groups Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analyticsData.age_groups}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {analyticsData.age_groups.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS.age[index % COLORS.age.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Customer Status */}
        <div className="chart-card">
          <h3 className="chart-title">Customer Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analyticsData.customer_status}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {analyticsData.customer_status.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS.primary[index % COLORS.primary.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Senior Citizens Distribution */}
        <div className="chart-card">
          <h3 className="chart-title">Senior Citizens</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analyticsData.senior_distribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {analyticsData.senior_distribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS.primary[index % COLORS.primary.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Dependents Distribution */}
        <div className="chart-card">
          <h3 className="chart-title">Dependents Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analyticsData.dependents_distribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {analyticsData.dependents_distribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS.primary[index % COLORS.primary.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Churn Trends Bar Chart */}
      {churnTrends && (
        <div className="chart-card full-width">
          <h3 className="chart-title">Satisfaction vs Churn Score Trends</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={churnTrends.satisfaction_vs_churn}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="satisfaction_range" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="avg_churn_score" fill="#EF4444" name="Average Churn Score" />
              <Bar dataKey="customer_count" fill="#3B82F6" name="Customer Count" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

