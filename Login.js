import React, { useState } from "react";
import axios from "axios";

function Login({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/api/token/", {
      username: username,
      password: password
    })
    .then(res => {
      setToken(res.data.access);
      localStorage.setItem("token", res.data.access);
    })
    .catch(err => console.log(err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br/>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br/>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;