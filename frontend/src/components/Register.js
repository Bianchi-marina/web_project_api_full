import React from "react";
import { Link, withRouter } from "react-router-dom";
import InfoTooltip from "./InfoTooltip"; 
import * as auth from "../utils/auth";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      showModal: false,
      isSuccess: false,
      message: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    if (email && password) {
      auth
        .register(email, password)
        .then(() => {
          this.setState({
            showModal: true,
            isSuccess: true,
            message: "Vitória! Você precisa se registrar."
          });
          setTimeout(() => {
            this.props.history.push("/signin");
          }, 1500);
          
        })
        .catch((error) => {
          console.error("Erro de registro:", error);
          this.setState({
            showModal: true,
            isSuccess: false,
            message: "Ops, algo saiu deu errado! Por favor, tente novamente."
          });
        });
    }
  } 
  
  closeModal() {
    this.setState({
      showModal: false,
      isSuccess: false,
      message: ""
    });
  }

  render() {
    const { email, password, showModal, isSuccess, message } = this.state;
    return (
      <>
        <div className="register">
          <p className="register__welcome">Inscrever-se</p>
          <form onSubmit={this.handleSubmit} className="register__form">
            <input
              placeholder="E-mail"
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={this.handleChange}
              className="register__input"
              required
            />

            <input
              placeholder="Senha"
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={this.handleChange}
              className="register__input"
              required
            />

            <div className="register__button-container">
              <button type="submit" className="register__button">
                Inscrever-se
              </button>
            </div>
          </form>

          <p className="register__signin">
            Já é um membro?{" "}
            <Link className="link" to="/signin">
              Faça o Login aqui!
            </Link>
          </p>
           <InfoTooltip
            isOpen={showModal}
            onClose={this.closeModal}
            isSuccess={isSuccess}
            message={message}
          />
        </div>
      </>
    );
  }
}

export default withRouter(Register);
