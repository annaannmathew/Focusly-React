import React, { useState, useEffect } from 'react';
import '../css/MoodCheckIn.css';

const MoodCheckIn = ({ userId }) => {
  const [mood, setMood] = useState('');
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState('');

  const handleMoodSubmit = async () => {
    if (!mood.trim()) return;

    try {
      const response = await fetch(`/moodcheckin/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood })
      });

      if (response.ok) {
        setMessage('Mood submitted!');
        setMood('');
        fetchMoodHistory();
      } else {
        setMessage('Failed to submit mood.');
      }
    } catch (error) {
      setMessage('Server error.');
    }
  };

  const fetchMoodHistory = async () => {
    try {
      const res = await fetch(`/moodcheckin/history/${userId}`);
      const data = await res.json();
      setHistory(data);
    } catch (err) {
      setMessage('Could not fetch history.');
    }
  };

  useEffect(() => {
    if (userId) {
      fetchMoodHistory();
    }
  }, [userId]);

  return (
    <div className="mood-container">
      <h2>Mood Check-In</h2>
      <input
        type="text"
        placeholder="How do you feel?"
        value={mood}
        onChange={(e) => setMood(e.target.value)}
      />
      <button onClick={handleMoodSubmit}>Submit</button>
      <p className="mood-message">{message}</p>

      <div className="mood-history">
        <h3>Your Mood History</h3>
        {history.length === 0 ? (
          <p>No mood history found.</p>
        ) : (
          <ul>
            {history.map((entry) => (
              <li key={entry.id}>
                <strong>{entry.mood}</strong> —{' '}
                <small>{new Date(entry.timestamp).toLocaleString()}</small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MoodCheckIn;
