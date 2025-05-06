import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthForm from "./component/AuthForm";
import StudyPlan from "./component/StudyPlan";
import BadgeList from "./component/Badge";
import Forum from "./component/Forum";
import MoodCheckIn from "./component/MoodCheckIn";
import Dashboard from "./component/Dashboard";
import Notifications from "./component/Notification";
import SearchPage from "./component/SearchPage";

function App() {
  const [userId, setUserId] = useState(null);

  const handleLogin = (loggedInUserId) => {
    setUserId(loggedInUserId);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={userId ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />}
        />
        <Route path="/login" element={<AuthForm type="login" onLogin={handleLogin} />} />
        <Route path="/register" element={<AuthForm type="register" onLogin={handleLogin} />} />
        <Route path="/studyplan" element={<StudyPlan userId={userId} />} />
        <Route path="/badges/:userId" element={<BadgeList />} />
        <Route path="/forum" element={<Forum userId={userId} />} />
        <Route path="/moodcheckin/history/:userId" element={<MoodCheckIn />} />
        <Route path="/dashboard" element={<Dashboard userId={userId} />} />
        <Route path="/notifications" element={<Notifications userId={userId} />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </Router>
  );
}

export default App;
