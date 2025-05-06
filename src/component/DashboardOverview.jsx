import React, { useEffect, useState } from 'react';
import '../css/Dashboard.css';

const DashboardOverview = ({ userId }) => {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOverview = async () => {
    try {
      const response = await fetch(`http://localhost:8085/dashboard/overview?userId=${userId}`);
      const data = await response.json();
      setOverview(data);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchOverview();
    }
  }, [userId]);

  if (loading) return <div>Loading dashboard...</div>;
  if (!overview) return <div>No dashboard data available.</div>;

  return (
    <div className="dashboard-container">
      <h2>Dashboard Overview</h2>
      <p>Total Study Plans: {overview.studyPlans.length}</p>
      <p>Total Tasks: {overview.totalTasks}</p>
      <p>Completed Tasks: {overview.completedTasks}</p>

      <h3>Your Study Plans:</h3>
      <ul>
        {overview.studyPlans.map((plan) => (
          <li key={plan.id}>
            <strong>{plan.title}</strong> — {plan.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardOverview;
