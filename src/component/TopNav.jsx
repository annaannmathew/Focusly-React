import React, { useState } from "react";
import axios from "axios";

const TopNav = ({ userId, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div className="top-nav">
      <div className="top-nav-left">
        <button className="menu-toggle" onClick={() => document.body.classList.toggle("sidebar-open")}>
          ☰
        </button>
        <h2>Dashboard</h2>
      </div>
      <div className="top-nav-right">
        <input
          type="text"
          placeholder="Search tasks or plans..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <a href={`/notifications/${userId}`} className="notification-icon">🔔</a>
      </div>
    </div>
  );
};

export default TopNav;
