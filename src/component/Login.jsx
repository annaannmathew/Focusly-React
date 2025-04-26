import React, { useState } from "react";
import axios from "axios";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin
      ? "http://localhost:8085/auth/login"
      : "http://localhost:8085/auth/register";

    try {
      const response = await axios.post(endpoint, formData);
      alert(response.data);

      if (response.data === "Login successful!") {
        window.location.href = "/dashboard"; // or protected route
      }

      if (!isLogin) {
        // After registration, switch to login form
        setIsLogin(true);
      }
    } catch (error) {
      alert("Error: " + (error.response?.data || "Something went wrong"));
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center" }}>
      <h2>{isLogin ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <br />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">{isLogin ? "Login" : "Register"}</button>
      </form>
      <p style={{ marginTop: "10px" }}>
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          style={{ background: "none", border: "none", color: "blue", cursor: "pointer" }}
        >
          {isLogin ? "Register here" : "Login here"}
        </button>
      </p>
    </div>
  );
};

export default AuthForm;
