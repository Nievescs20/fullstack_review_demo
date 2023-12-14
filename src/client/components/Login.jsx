import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ setToken }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    try {
      const { data: token } = await axios.post("/auth/login", {
        username,
        password,
      });
      localStorage.setItem("TOKEN", token.token);
      setToken(token.token);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <div>
        <input
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default Login;
