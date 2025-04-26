import React, { useState } from "react";
import axios from "axios";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email_id: "",
    password: ""
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin
      ? "http://localhost:8085/auth/login"
      : "http://localhost:8085/auth/register";

    try {
      const payload = isLogin
        ? { username: formData.username, password: formData.password }
        : formData;

      const response = await axios.post(url, payload);
      alert(response.data);

      if (response.data === "Login successful!") {
        window.location.href = "/dashboard";
      }

      if (!isLogin) {
        setIsLogin(true); // after registration, switch to login
      }

    } catch (error) {
      alert("Something went wrong!");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center" }}>
      <h2>{isLogin ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <input
              name="name"
              placeholder="Name"
              onChange={handleChange}
              required
            /><br /><br />
            <input
              name="email_id"
              placeholder="Email"
              onChange={handleChange}
              required
            /><br /><br />
          </>
        )}
        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
        /><br /><br />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        /><br /><br />
        <button type="submit">{isLogin ? "Login" : "Register"}</button>
      </form>
      <p style={{ marginTop: "10px" }}>
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
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
