import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/Badge.css";

const Badge = ({ userId }) => {
  const [badges, setBadges] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (userId) {
      fetchBadges();
    }
  }, [userId]);

  const fetchBadges = async () => {
    try {
      const response = await axios.get(`http://localhost:8085/badge/${userId}`);
      setBadges(response.data);
    } catch (err) {
      console.error("Error fetching badges:", err);
      setError("Failed to fetch badges.");
    }
  };

  return (
    <div className="badge-container">
      <h2 className="badge-header">Your Badges</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {badges.length === 0 ? (
        <p className="badge-empty">You haven't earned any badges yet.</p>
      ) : (
        <ul className="badge-list">
          {badges.map((badge) => (
            <li className="badge-item" key={badge.id}>
              <h4>{badge.badgeName}</h4>
              <p>{badge.description}</p>
              <p><strong>Criteria:</strong> {badge.criteria}</p>
              <p><em>Earned on: {new Date(badge.timestamp).toLocaleDateString()}</em></p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Badge;
