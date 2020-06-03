import React from "react";
import { Redirect } from "react-router-dom";
/* TO DO:
 * Find a way to store user session in the front-end(using cookies or local-store or something else)
 */
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameOrEmail: "",
      password: "",
      isFieldEmpty: false,
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.performLogin = this.performLogin.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleEmailChange(event) {
    if (event.target) {
      this.setState({ usernameOrEmail: event.target.value });
    }
  }

  handlePasswordChange(event) {
    if (event.target) {
      this.setState({ password: event.target.value });
    }
  }

  handleKeyDown(event) {
    if (event.key == "Enter") {
      this.performLogin({});
    }
  }

  performLogin(event) {
    let { usernameOrEmail, password } = this.state;
    usernameOrEmail = usernameOrEmail.trim();
    password = password.trim();

    if (usernameOrEmail && password) {
      this.setState({ isFieldEmpty: false }, () => {
        this.props.login(this.state);
      });
    } else {
      this.setState({ isFieldEmpty: true });
    }
  }

  render() {
    const { isFieldEmpty } = this.state;
    const { loginFailed } = this.props;
    let errorMessage = "";

    if (isFieldEmpty) {
      errorMessage = "All fields are required";
    } else if (loginFailed) {
      errorMessage = "Either email/username or password is not valid";
    }

    if (this.props.isAuthenticated) {
      return <Redirect from="/login" to="/" />;
    }
    return (
      <div className="login-register-container container">
        <div>
          <h1 className="login-register-header">Login</h1>
        </div>
        <div className="login-inputs-container">
          <input
            placeholder="Username or email"
            onChange={this.handleEmailChange}
          />
          <input
            placeholder="Password"
            onKeyDown={this.handleKeyDown}
            onChange={this.handlePasswordChange}
          />
          <button onClick={this.performLogin}>LogIn</button>
          <p>{errorMessage}</p>
        </div>
      </div>
    );
  }
}

export default Login;
