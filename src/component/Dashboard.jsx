import React, { useEffect, useState } from "react";
import axios from "axios";
import TopNav from "./TopNav";
import SideNav from "./SideNav";
import "../css/Dashboard.css"; // Ensure this path matches your actual CSS file

const Dashboard = ({ userId }) => {
  const [overview, setOverview] = useState({});
  const [searchResults, setSearchResults] = useState({ tasks: [], studyPlans: [] });

  useEffect(() => {
    axios
      .get(`http://localhost:8085/dashboard/overview?userId=${userId}`)
      .then((res) => setOverview(res.data))
      .catch((err) => console.error(err));
  }, [userId]);

  const handleSearch = (query) => {
    axios
      .get(`http://localhost:8085/search?query=${query}`)
      .then((res) => setSearchResults(res.data))
      .catch((err) => console.error(err));
  };

  return (
    <div className="dashboard-layout">
      {/* Top Navigation Bar */}
      <TopNav userId={userId} onSearch={handleSearch} />

      {/* Side Navigation Bar */}
      <SideNav userId={userId} />

      {/* Main Content */}
      <div className="main-content">
        <h2>Welcome to Your Dashboard</h2>

        <div className="user-profile">
          <h3>User Profile</h3>
          <p><strong>Total Tasks:</strong> {overview.totalTasks}</p>
          <p><strong>Completed Tasks:</strong> {overview.completedTasks}</p>
        </div>

        {searchResults.tasks.length > 0 || searchResults.studyPlans.length > 0 ? (
          <div className="search-results">
            <h4>Search Results</h4>

            <div>
              <strong>Tasks:</strong>
              <ul>
                {searchResults.tasks.map((task) => (
                  <li key={task.id}>{task.title}</li>
                ))}
              </ul>
            </div>

            <div>
              <strong>Study Plans:</strong>
              <ul>
                {searchResults.studyPlans.map((plan) => (
                  <li key={plan.id}>{plan.goal}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Dashboard;
