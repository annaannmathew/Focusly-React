import React, { useState } from 'react';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ tasks: [], studyPlans: [] });
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const res = await fetch(`http://localhost:8085/search?query=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error('Search failed');
      const data = await res.json();
      setResults(data);
      setError('');
    } catch (err) {
      setError('Error fetching search results');
    }
  };

  return (
    <div>
      <h2>Search Tasks and Plans</h2>
      <input
        type="text"
        placeholder="Search by title, description or goal..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ marginTop: '20px' }}>
        <h3>Study Tasks</h3>
        <ul>
          {results.tasks.map((task) => (
            <li key={task.id}>
              <strong>{task.title}</strong> - {task.description}
            </li>
          ))}
        </ul>

        <h3>Study Plans</h3>
        <ul>
          {results.studyPlans.map((plan) => (
            <li key={plan.id}>
              <strong>{plan.goal}</strong> - {plan.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchPage;
