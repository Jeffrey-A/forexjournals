import React from "react";
import { Redirect } from "react-router-dom";

class Login extends React.Component {
  render() {
    if (this.props.isAuthenticated) {
      return <Redirect from="/login" to="/" />;
    }
    return (
      <div className="login-register-container container">
        <div>
          <h1 className='login-register-header'>Login</h1>
        </div>
        <div className='login-inputs-container'>
          <input />
          <input />
          <button onClick={this.props.login}>LogIn</button>
        </div>
      </div>
    );
  }
}

export default Login;
