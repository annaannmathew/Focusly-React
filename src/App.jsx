// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./component/Login";
// import Register from "./component/Register";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Default route redirects to /login */}
//         <Route path="/" element={<Navigate to="/login" />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         {/* You can add a dashboard or 404 route later */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthForm from "./component/AuthForm";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to /login */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Login and Register both handled by AuthForm */}
        <Route path="/login" element={<AuthForm />} />
        <Route path="/register" element={<AuthForm />} />

        {/* You can add more routes like Dashboard later */}
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
