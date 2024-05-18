/* eslint-disable no-unused-vars */
import React, { useState } from "react";


function Auth() {
  return (
    <div className="auth">
      {/* <Login /> */}
      <Cadastro />
    </div>
  );
}

export default Auth;

// //componente Login
// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   return (
//     <div className="container-cadastro">
//       <Form 
//         username={username} setUsername={setUsername} password={password} setPassword={setPassword} label="Login"

//         />
//     </div>
//   );
// };

//componente Cadastro
const Cadastro = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
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
      alert: "Cadastrado com sucesso! Agora faça o login.",
    });
    const data = await response.json();
    console.log(data);
  }

  return (
    <div className="container-cadastro">
      <h2>Faça seu cadastro</h2>
      <div className="form-group">
        <form onSubmit={onSubmit}>
          <label htmlFor="username">Nome:</label>
          <br />
          <input
            type="text"
            id="username"
            onChange={(event) => setUsername(event.target.value)}
          />
          <br />
          <br />
          <label htmlFor="email">Email:</label>
          <br />
          <input
            type="email"
            id="email"
            onChange={(event) => setEmail(event.target.value)}
          />
          <br />
          <br />
          <label htmlFor="password">Senha:</label>
          <br />
          <input
            type="password"
            id="password"
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

const Form = ({ username, setUsername, password, setPassword, label }) => {
  return (
    <div className="container-cadastro">
      <h2>Faça seu cadastro</h2>
      <div className="form-group">
        <form>
          <label htmlFor="username">Nome:</label>
          <br />
          <input
            type="text"
            id="username"
            onChange={(event) => setUsername(event.target.value)}
          />
          <br />
          <br />
          <label htmlFor="password">Senha:</label>
          <br />
          <input
            type="password"
            id="password"
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
