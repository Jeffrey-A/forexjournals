import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
// Styles
import './styles/Main.css';
// Pages
import HomePage from './pages/HomePage';
import Journals from './pages/Journals';
import Strategies from './pages/Strategies';
import ViewJournal from './pages/ViewJournal';
import ViewStrategy from './pages/ViewStrategy';
import NoFound from './pages/NoFound';
import Login from './pages/Login';
import Register from './pages/Register';
import Nav from './components/Nav';
import EditStrategy from './pages/EditStrategy';

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      rest.isAuthenticated === true ? (
        <Component {...rest} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      loginFailed: false,
      user: {},
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.register = this.register.bind(this);
  }

  register(userInfo) {
    const { username, email, password } = userInfo;

    fetch('/api/v1/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_name: username, pass_word: password, email }),
    }).then((response) => {
      if (response.status > 200) {
        this.setState({ wasRegistrationSuccessful: false });
      } else {
        this.setState({ wasRegistrationSuccessful: true });
      }
    });
  }

  login(userInfo) {
    const { usernameOrEmail, password } = userInfo;

    fetch('/api/v1/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_name: usernameOrEmail, pass_word: password }),
    })
      .then((response) => {
        if (response.status > 200) {
          this.setState({ loginFailed: true });
          return;
        }
        return response.json();
      })
      .then((user) => {
        if (user.id) {
          this.setState({ isAuthenticated: true, loginFailed: false, user });
        } else {
          this.setState({ loginFailed: true });
        }
      });
  }

  logout() {
    this.setState({ isAuthenticated: false });
  }

  render() {
    const { isAuthenticated, wasRegistrationSuccessful, user } = this.state;

    return (
      <div>
        <Nav logout={this.logout} isAuthenticated={isAuthenticated} />
        <Switch>
          <Route exact path="/" render={(props) => <HomePage {...props} />} />
          <Route
            exact
            path="/login"
            render={(props) => (
              <Login
                isAuthenticated={isAuthenticated}
                loginFailed={this.state.loginFailed}
                login={this.login}
                {...props}
              />
            )}
          />
          <Route
            exact
            path="/register"
            render={(props) => (
              <Register
                wasRegistrationSuccessful={wasRegistrationSuccessful}
                register={this.register}
                isAuthenticated={isAuthenticated}
                {...props}
              />
            )}
          />
          <ProtectedRoute
            exact
            path="/journals"
            user={user}
            isAuthenticated={isAuthenticated}
            component={Journals}
          />

          <ProtectedRoute
            exact
            path="/journals/view/:strategyId"
            user={user}
            isAuthenticated={isAuthenticated}
            component={ViewJournal}
          />

          <ProtectedRoute
            exact
            path="/strategies"
            user={user}
            isAuthenticated={isAuthenticated}
            component={Strategies}
          />

          <ProtectedRoute
            exact
            user={user}
            path="/strategies/view/:id"
            isAuthenticated={isAuthenticated}
            component={ViewStrategy}
          />
          <ProtectedRoute
            exact
            user={user}
            path="/strategies/edit/:id"
            isAuthenticated={isAuthenticated}
            component={EditStrategy}
          />
          <Route path="*" render={(props) => <NoFound user={user} />} />
        </Switch>
      </div>
    );
  }
}

export default App;
