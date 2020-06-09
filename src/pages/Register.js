import React from "react";
import { Redirect } from "react-router";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      confirmed_password: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.createUser = this.createUser.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.areInputsValid = this.areInputsValid.bind(this);
    this.isUserNameValid = this.isUserNameValid.bind(this);
    this.isPasswordValid = this.isPasswordValid.bind(this);
    this.isEmailValid = this.isEmailValid.bind(this);
  }

  handleInputChange(event, inputName) {
    const value = event.target.value;
    this.setState({ [inputName]: value.trim() });
  }

  handleKeyDown(event) {
    if (event.key == "Enter") {
      this.createUser({});
    }
  }

  areInputsValid() {
    return (
      this.isEmailValid() && this.isPasswordValid() && this.isUserNameValid()
    );
  }

  isUserNameValid() {
    // TODO: find a proper way to check if an username is valid.
    const { username } = this.state;
    return username.length > 3;
  }

  isEmailValid() {
    // TODO: find a proper way to check if an email is valid.
    const { email } = this.state;
    return email.length > 7;
  }

  isPasswordValid() {
    // TODO: find a proper way to check if a password is valid.
    const { password, confirmed_password } = this.state;
    return password === confirmed_password && password.length > 3;
  }

  createUser(event) {
    if (this.areInputsValid()) {
      this.props.register(this.state);
    }
  }

  render() {
    if (this.props.wasRegistrationSuccessful) {
      return <Redirect from="register" to="/login" />;
    }
    return (
      <div className="login-register-container container">
        <div>
          <h1 className="login-register-header">Register</h1>
        </div>
        <div className="login-register-inputs-container">
          <input
            onKeyDown={this.handleKeyDown}
            placeholder="Username"
            onChange={(e) => this.handleInputChange(e, "username")}
          />
          <input
            onKeyDown={this.handleKeyDown}
            placeholder="Email address"
            onChange={(e) => this.handleInputChange(e, "email")}
          />
          <input
            onKeyDown={this.handleKeyDown}
            placeholder="Password"
            onChange={(e) => this.handleInputChange(e, "password")}
          />
          <input
            placeholder="Confirm password"
            onKeyDown={this.handleKeyDown}
            onChange={(e) => this.handleInputChange(e, "confirmed_password")}
          />
          <button onClick={this.createUser}>Create</button>
        </div>
      </div>
    );
  }
}

export default Register;
