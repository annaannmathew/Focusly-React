import React from "react";
import { Link } from "react-router-dom";

const SideNav = ({ userId }) => {
  return (
    <div className="side-nav">
      <ul>
        <li><Link to="/dashboard">🏠 Profile</Link></li>
        <li><Link to={`/studyplan/${userId}`}>📝 Study Plan</Link></li>
        <li><Link to={`/moodcheckin/history/${userId}`}>😊 Mood Check-In</Link></li>
        <li><Link to={`/badges/${userId}`}>🎖️ Badges</Link></li>
        <li><Link to="/forum">💬 Forum</Link></li>
      </ul>
    </div>
  );
};

export default SideNav;
