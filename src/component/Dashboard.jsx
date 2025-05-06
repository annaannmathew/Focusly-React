import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Bell,
  Menu,
  Home,
  BookOpen,
  Smile,
  Award,
  MessageCircle,
} from "lucide-react";
import "../css/dashboard.css";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Dummy data for overview and search results
  const overview = {
    totalTasks: 12,
    completedTasks: 8,
  };

  const searchResults = {
    tasks: [],
    studyPlans: [],
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearch = () => {
    console.log("Search:", searchQuery);
    // Simulate search (update searchResults if needed)
  };

  return (
    <div className={`dashboard-layout ${isSidebarOpen ? "sidebar-open" : ""}`}>
      {/* Top Navigation */}
      <div className="top-nav">
        <Menu className="menu-toggle" onClick={toggleSidebar} />
        <h2 style={{ color: 'white' }}>FOCUSLY</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search tasks or plans..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
          <Bell className="notification-icon" />
        </div>
      </div>

      {/* Side Navigation */}
      <div className={`side-nav ${isSidebarOpen ? "open" : ""}`}>
        <ul>
          <li>
            <Link to="/dashboard">
              <Home size={18} /> Profile
            </Link>
          </li>
          <li>
            <Link to="/studyplan">
              <BookOpen size={18} /> Study Plan
            </Link>
          </li>
          <li>
            <Link to="/moodcheckin">
              <Smile size={18} /> Mood Check-In
            </Link>
          </li>
          <li>
            <Link to="/badges">
              <Award size={18} /> Badges
            </Link>
          </li>
          <li>
            <Link to="/forum">
              <MessageCircle size={18} /> Forum
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h2>Welcome to Your Dashboard</h2>

        <div className="user-profile">
          <h3>User Profile</h3>
          <p>
            <strong>Total Tasks:</strong> {overview.totalTasks}
          </p>
          <p>
            <strong>Completed Tasks:</strong> {overview.completedTasks}
          </p>
        </div>

        {(searchResults.tasks.length > 0 ||
          searchResults.studyPlans.length > 0) && (
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
        )}
      </div>
    </div>
  );
};

export default Dashboard;
