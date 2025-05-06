import React, { useState } from "react";
import axios from "axios";
import "./AuthForm.css";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");  

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError(""); 

    try {
      const url = isLogin
        ? "http://localhost:8085/auth/login"
        : "http://localhost:8085/auth/register";

      const response = await axios.post(url, formData);
      alert(response.data);

      if (response.data === "Login successful!") {
        window.location.href = "/dashboard";
      }

      if (!isLogin) {
        setIsLogin(true);
      }
    } catch (error) {
      alert("Something went wrong!");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isLogin ? "Login" : "Register"}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input
                name="name"
                placeholder="Full Name"
                onChange={handleChange}
                required
                className="auth-input"
              />
              <input
                name="email_id"
                placeholder="Email"
                onChange={handleChange}
                required
                className="auth-input"
              />

            </>
          )}
          <input
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
            className="auth-input"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="auth-input"
          />
          {!isLogin && (
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              onChange={handleChange}
              required
              className="auth-input"
            />
          )}
          {error && <p style={{ color: "red" }}>{error}</p>}  {/* Display error */}
          <button type="submit" className="auth-button">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
        <p style={{ marginTop: "10px" }}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="auth-toggle"
          >
            {isLogin ? "Register here" : "Login here"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
