import React, { useState } from "react";
import axios from "axios";
import './AuthForm.css';


const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8085/auth/login", credentials);
      alert(response.data);
      if (response.data === "Login successful!") {
        window.location.href = "/dashboard"; // redirect after success
      }
    } catch (error) {
      alert("Invalid login. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-header">Login</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          className="auth-input"
          name="username"
          placeholder="Username"
          value={credentials.username}
          onChange={handleChange}
          required
        />
        <input
          className="auth-input"
          name="password"
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          required
        />
        <button className="auth-button" type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
