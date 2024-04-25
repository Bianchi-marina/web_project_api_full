import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import * as auth from "../utils/auth";

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    auth
      .authorize(email, password)
      .then(() => {
        handleLogin(email);
        history.push("/");
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
  };
  return (
    <>
      <div className="login">
        <h2 className="login__welcome">Entrar</h2>
        <form onSubmit={handleSubmit} className="login__form">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
            required
            className="login__input"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            required
            className="login__input"
          />
          <div className="login__button-container">
            <button type="submit" className="login__button">
              Entrar
            </button>
          </div>
        </form>
        <p className="login__signin">
          Ainda não é membro?{" "}
          <Link className="link" to="/signup">
            Inscreva-se aqui!
          </Link>
        </p>
      </div>
    </>
  );
};

export default Login;
