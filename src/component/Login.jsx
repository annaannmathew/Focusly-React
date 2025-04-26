import React, { useState } from "react";
import axios from "axios";

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
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px", textAlign: "center" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          value={credentials.username}
          onChange={handleChange}
          required
        /><br /><br />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          required
        /><br /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
