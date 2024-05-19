/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';

function Auth() {
  return (
    <div className="auth">
      <Login />
      <Cadastro />
    </div>
  );
}

export default Auth;

// Componente Login
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cookie, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        username,
        password,
      });
      setCookies("access_token", response.data.token);
      window.localStorage.setItem("userID", response.data.userID);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error.response ? error.response.data : error.message);
      alert(error.response ? error.response.data.message : "Login failed. Please try again.");
    }
  };

  return (
    <div className="container-login">
      <Form
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        label="Login"
        usernameId="login-username"
        passwordId="login-password"
        onSubmit={onSubmit}
      />
    </div>
  );
};

// Componente Cadastro
const Cadastro = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/auth/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          email,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        alert("Cadastrado com sucesso! Agora faça o login.");
      } else {
        alert(data.message || "Cadastro failed!");
      }
    } catch (error) {
      console.error("Cadastro failed:", error);
      alert("Cadastro failed. Please try again.");
    }
  };

  return (
    <div className="container-cadastro">
      <h2>Faça seu cadastro</h2>
      <div className="form-group">
        <form onSubmit={onSubmit}>
          <label htmlFor="cadastro-username">Nome:</label>
          <br />
          <input
            type="text"
            id="cadastro-username"
            onChange={(event) => setUsername(event.target.value)}
          />
          <br />
          <br />
          <label htmlFor="cadastro-email">Email:</label>
          <br />
          <input
            type="email"
            id="cadastro-email"
            onChange={(event) => setEmail(event.target.value)}
          />
          <br />
          <br />
          <label htmlFor="cadastro-password">Senha:</label>
          <br />
          <input
            type="password"
            id="cadastro-password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <br />
          <br />
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
};

const Form = ({
  username,
  setUsername,
  password,
  setPassword,
  label,
  usernameId,
  passwordId,
  onSubmit,
}) => {
  return (
    <div className="container-cadastro">
      <h2>{label}</h2>
      <div className="form-group">
        <form onSubmit={onSubmit}>
          <label htmlFor={usernameId}>Nome:</label>
          <br />
          <input
            type="text"
            id={usernameId}
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <br />
          <br />
          <label htmlFor={passwordId}>Senha:</label>
          <br />
          <input
            type="password"
            id={passwordId}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <br />
          <br />
          <button type="submit">{label}</button>
        </form>
      </div>
    </div>
  );
};
