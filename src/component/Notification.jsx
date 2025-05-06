import React, { useEffect, useState } from 'react';

const Notifications = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState('');

  const fetchNotifications = async () => {
    try {
      const res = await fetch(`http://localhost:8085/api/notifications/user/${userId}`);
      const data = await res.json();
      setNotifications(data);
    } catch (err) {
      setError('Failed to fetch notifications');
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      await fetch(`http://localhost:8085/api/notifications/${notificationId}/read`, {
        method: 'PUT',
      });
      fetchNotifications(); // Refresh after marking
    } catch (err) {
      setError('Failed to mark notification as read');
    }
  };

  useEffect(() => {
    if (userId) {
      fetchNotifications();
    }
  }, [userId]);

  return (
    <div className="notification-container">
      <h2>Your Notifications</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {notifications.length === 0 ? (
        <p>No notifications found.</p>
      ) : (
        <ul>
          {notifications.map((note) => (
            <li key={note.id} style={{ marginBottom: '10px' }}>
              <strong>{note.type}</strong>: {note.message} <br />
              <small>{new Date(note.timestamp).toLocaleString()}</small> <br />
              {note.read ? (
                <span style={{ color: 'green' }}>✓ Read</span>
              ) : (
                <button onClick={() => markAsRead(note.id)}>Mark as Read</button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
