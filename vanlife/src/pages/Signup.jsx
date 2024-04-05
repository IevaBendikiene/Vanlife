import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password);
    setEmail("")
    setPassword("")
  };

  return (
    <div className="login-container">
      <h1>Register</h1>
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
        <button disabled={isLoading}>Sign up</button>
        {error && <h3 className="login-error">{error}</h3>}
      </form>
    </div>
  );
}
