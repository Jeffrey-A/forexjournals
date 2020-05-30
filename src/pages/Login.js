import React from "react";
import { Redirect } from "react-router-dom";
/* TO DO: 

* I need to decide if I'll allow the user to login using either username or email.
If both ways are allowed then I'll need to refactor /config/passport.js.

* I need to incorporate a more robust input validation.

* Find a way to store user session in the front-end(using cookies or local-store or something else)

*/
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameOrEmail: "",
      password: "",
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.performLogin = this.performLogin.bind(this);
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

  performLogin(event) {
    const {usernameOrEmail, password} = this.state;
    if (usernameOrEmail || password) {
      this.props.login(this.state);
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
          <button onClick={this.performLogin}>LogIn</button>
        </div>
      </div>
    );
  }
}

export default Login;
