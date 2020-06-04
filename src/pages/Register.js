import React from "react";

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
  }

  handleInputChange(event, inputName) {
    const value = event.target.value;
    this.setState({ [inputName]: value });
  }

  handleKeyDown(event) {
    if (event.key == "Enter") {
      this.createUser({});
    }
  }

  createUser(event) {
    // TODO: validate inputs
    const { username, email, password, confirmed_password } = this.state;
    this.props.register(this.state);
  }
  render() {
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
