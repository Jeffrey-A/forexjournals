import React from "react";
import { Redirect } from "react-router-dom";

class Login extends React.Component {
  render() {
    if (this.props.isAuthenticated) {
      return <Redirect from="/login" to="/" />;
    }
    return (
      <div>
        <h1>Login</h1>
        <button onClick={this.props.login}>LogIn</button>
      </div>
    );
  }
}

export default Login;
