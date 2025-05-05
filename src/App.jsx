import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthForm from "./component/AuthForm";
import StudyPlan from "./component/StudyPlan";
import BadgeList from "./component/Badge"; 
import Forum from "./component/Forum";
import MoodCheckIn from "./component/MoodCheckIn";

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
          element={userId ? <Navigate to="/studyplan" replace /> : <Navigate to="/login" replace />}
        />
        <Route path="/login" element={<AuthForm type="login" onLogin={handleLogin} />} />
        <Route path="/register" element={<AuthForm type="register" onLogin={handleLogin} />} />
        <Route
          path="/studyplan"
          element={<StudyPlan userId={userId} />}
          />
        <Route
          path="/badges"
          element={<BadgeList userId={userId} />}
        />
        <Route
          path="/forum"
          element={<Forum userId={userId} />}
        />
        <Route path="/mood-checkin" element={<MoodCheckIn userId={userId} />} />

      </Routes>
    </Router>
  );
}

export default App;
