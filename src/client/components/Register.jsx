import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register({ setToken }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister() {
    try {
      const { data: token } = await axios.post("/auth/register", {
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
      <h2>Register</h2>
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
        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
}

export default Register;
