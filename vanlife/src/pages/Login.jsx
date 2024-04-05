import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    
  };

  return (
    <div className="login-container">
      <h1>Sign in to your account</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email address"
          value={email}
        />
        <input
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          value={password}
        />
        <button disabled={isLoading}>Log in</button>
        {error && <h3 className="login-error">{error}</h3>}
      </form>
      <p>or</p>
      <Link to="/signup" className="register-btn">Register</Link>
    </div>
  );
}
