import React from 'react';
import { Redirect } from 'react-router';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmed_password: '',
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
    const { value } = event.target;
    this.setState({ [inputName]: value.trim() });
  }

  handleKeyDown(event) {
    if (event.key == 'Enter') {
      this.createUser({});
    }
  }

  areInputsValid() {
    return (
      this.isUserNameValid() && this.isEmailValid() && this.isPasswordValid()
    );
  }

  isUserNameValid() {
    const { username } = this.state;
    if (/^[a-zA-Z_]\w{4,29}$/.test(username)) {
      return true;
    }

    document.getElementById('username').classList.add('input-error');
    return false;
  }

  isEmailValid() {
    const { email } = this.state;
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return true;
    }

    const emailInput = document.getElementById('email');
    emailInput.classList.add('input-error');
    return false;
  }

  isPasswordValid() {
    const { password, confirmed_password } = this.state;

    if (password !== confirmed_password || !password.length > 4) {
      document.getElementById('password').classList.add('input-error');
      document
        .getElementById('confirmed_password')
        .classList.add('input-error');
      return false;
    }
    return true;
  }

  createUser(event) {
    const { register } = this.props;
    if (this.areInputsValid()) {
      register(this.state);
    }
  }

  render() {
    const { wasRegistrationSuccessful } = this.props;
    if (wasRegistrationSuccessful) {
      return <Redirect from="register" to="/login" />;
    }
    return (
      <div className="login-register-container container">
        <div>
          <h1 className="login-register-header">Register</h1>
        </div>
        <div className="login-register-inputs-container">
          <input
            id="username"
            onKeyDown={this.handleKeyDown}
            placeholder="Username"
            onChange={(e) => this.handleInputChange(e, 'username')}
          />
          <input
            id="email"
            onKeyDown={this.handleKeyDown}
            placeholder="Email address"
            onChange={(e) => this.handleInputChange(e, 'email')}
          />
          <input
            id="password"
            onKeyDown={this.handleKeyDown}
            placeholder="Password"
            onChange={(e) => this.handleInputChange(e, 'password')}
            type="password"
          />
          <input
            id="confirmed_password"
            type="password"
            placeholder="Confirm password"
            onKeyDown={this.handleKeyDown}
            onChange={(e) => this.handleInputChange(e, 'confirmed_password')}
          />
          <button onClick={this.createUser}>Create</button>
        </div>
      </div>
    );
  }
}

export default Register;
