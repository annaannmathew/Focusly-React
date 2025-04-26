import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    username: "",
    email_id: "",
    password: "",
  });

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8085/auth/register", user);
      alert("Registered successfully!");
      window.location.href = "/login";
    } catch (error) {
      alert("Error during registration");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center" }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={user.name}
          onChange={handleChange}
          placeholder="Name"
          required
        /><br /><br />
        <input
          name="username"
          value={user.username}
          onChange={handleChange}
          placeholder="Username"
          required
        /><br /><br />
        <input
          name="email_id"
          type="email_id"
          value={user.email_id}
          onChange={handleChange}
          placeholder="Email"
          required
        /><br /><br />
        <input
          name="password"
          type="password"
          value={user.password}
          onChange={handleChange}
          placeholder="Password"
          required
        /><br /><br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
