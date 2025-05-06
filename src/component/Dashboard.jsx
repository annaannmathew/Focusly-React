import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Smile,
  Medal,
  MessageCircle,
  Menu,
  Search,
  Bell
} from "lucide-react";

const Dashboard = ({ userId }) => {
  const [overview, setOverview] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [searchResults, setSearchResults] = useState({ tasks: [], studyPlans: [] });
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:8085/dashboard/overview?userId=${userId}`)
      .then(res => setOverview(res.data))
      .catch(err => console.error(err));

    axios.get(`http://localhost:8085/api/notifications/user/${userId}`)
      .then(res => setNotifications(res.data))
      .catch(err => console.error(err));
  }, [userId]);

  const handleSearch = () => {
    axios.get(`http://localhost:8085/search?query=${searchQuery}`)
      .then(res => setSearchResults(res.data))
      .catch(err => console.error(err));
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className={`bg-gray-900 text-white transition-all duration-300 ${sidebarOpen ? "w-64" : "w-16"} p-4`}>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white mb-6">
          <Menu />
        </button>
        <nav className="space-y-4">
          <Link to="/dashboard" className="flex items-center space-x-2 hover:text-yellow-300">
            <LayoutDashboard />
            {sidebarOpen && <span>Dashboard</span>}
          </Link>
          <Link to="/studyplan" className="flex items-center space-x-2 hover:text-yellow-300">
            <BookOpen />
            {sidebarOpen && <span>Study Plan</span>}
          </Link>
          <Link to={`/moodcheckin/history/${userId}`} className="flex items-center space-x-2 hover:text-yellow-300">
            <Smile />
            {sidebarOpen && <span>Mood Check-In</span>}
          </Link>
          <Link to={`/badges/${userId}`} className="flex items-center space-x-2 hover:text-yellow-300">
            <Medal />
            {sidebarOpen && <span>Badges</span>}
          </Link>
          <Link to="/forum" className="flex items-center space-x-2 hover:text-yellow-300">
            <MessageCircle />
            {sidebarOpen && <span>Forum</span>}
          </Link>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8 bg-gray-100">
        <h2 className="text-3xl font-semibold mb-6">Dashboard Overview</h2>

        {/* Study Plan Overview */}
        <section className="mb-6 bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">Study Plans</h3>
          <ul className="list-disc ml-6">
            {overview.studyPlans?.map(plan => (
              <li key={plan.id}>{plan.goal}</li>
            ))}
          </ul>
          <p>Total Tasks: {overview.totalTasks}</p>
          <p>Completed Tasks: {overview.completedTasks}</p>
        </section>

        {/* Notifications */}
        <section className="mb-6 bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2"><Bell /> Notifications</h3>
          <ul className="list-disc ml-6">
            {notifications.map(note => (
              <li key={note.id}>
                {note.message} — <span className="text-sm text-gray-600">{new Date(note.timestamp).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Search */}
        <section className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2"><Search /> Search Tasks & Plans</h3>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              className="flex-1 p-2 border border-gray-300 rounded"
              placeholder="Search..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleSearch}>
              Search
            </button>
          </div>
          <div>
            <h4 className="font-semibold">Task Results</h4>
            <ul className="list-disc ml-6">
              {searchResults.tasks.map(task => (
                <li key={task.id}>{task.title}</li>
              ))}
            </ul>

            <h4 className="font-semibold mt-4">Study Plan Results</h4>
            <ul className="list-disc ml-6">
              {searchResults.studyPlans.map(plan => (
                <li key={plan.id}>{plan.goal}</li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
