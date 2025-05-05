import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    username: "",
    email_id: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));

    if (
      (name === "confirmPassword" && user.password !== value) ||
      (name === "password" && user.confirmPassword !== value)
    ) {
      setError("Passwords do not match");
    } else {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.password !== user.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const { confirmPassword, ...userData } = user;
      await axios.post("http://localhost:8085/auth/register", userData);
      alert("Registered successfully!");
      window.location.href = "/login";
    } catch (error) {
      alert("Error during registration");
    }
  };

  const isFormValid =
    user.name &&
    user.username &&
    user.email_id &&
    user.password &&
    user.confirmPassword &&
    user.password === user.confirmPassword;

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        textAlign: "left",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Register</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <input
            name="name"
            value={user.name}
            onChange={handleChange}
            placeholder="Name"
            required
            style={{ width: "100%", padding: "10px", boxSizing: "border-box" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <input
            name="username"
            value={user.username}
            onChange={handleChange}
            placeholder="Username"
            required
            style={{ width: "100%", padding: "10px", boxSizing: "border-box" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <input
            name="email_id"
            type="email"
            value={user.email_id}
            onChange={handleChange}
            placeholder="Email"
            required
            style={{ width: "100%", padding: "10px", boxSizing: "border-box" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <input
            name="password"
            type="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Password"
            required
            style={{ width: "100%", padding: "10px", boxSizing: "border-box" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <input
            name="confirmPassword"
            type="password"
            value={user.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
            style={{ width: "100%", padding: "10px", boxSizing: "border-box" }}
          />
          {error && (
            <div style={{ color: "red", fontSize: "13px", marginTop: "5px" }}>
              {error}
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={!isFormValid}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: isFormValid ? "pointer" : "not-allowed",
          }}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
