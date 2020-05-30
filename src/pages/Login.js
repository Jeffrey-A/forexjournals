import React from "react";
import { Redirect } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameOrEmail: "",
      password: "",
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleEmailChange(event) {
    if (event.target) {
      this.setState({ usernameOrEmail: event.target.value });
    }
  }

  handlePasswordChange(event){
    console.log(event)
    if (event.target) {
      this.setState({ password: event.target.value });
    }
  }

  render() {
    const { usernameOrEmail, password } = this.state;

    if (this.props.isAuthenticated) {
      return <Redirect from="/login" to="/" />;
    }
    return (
      <div className="login-register-container container">
        <div>
          <h1 className="login-register-header">Login</h1>
        </div>
        <div className="login-inputs-container">
          <input onChange={this.handleEmailChange} />
          <input onChange={this.handlePasswordChange} />
          <button onClick={this.props.login}>LogIn</button>
        </div>
      </div>
    );
  }
}

export default Login;
