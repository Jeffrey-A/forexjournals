import React from 'react';
import { withCookies, Cookies } from 'react-cookie';
import { Switch, Route, Redirect } from 'react-router-dom';

import ProtectedRoute from './components/elements/ProtectedRoute';

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

// Styles
import './styles/Main.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      loginFailed: false,
      user: {},
      token: null,
      strategies: [],
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.register = this.register.bind(this);
    this.performAPICall = this.performAPICall.bind(this);
    this.getAllStrategies = this.getAllStrategies.bind(this);
  }

  componentDidMount() {
    const { cookies } = this.props;
    const token = cookies.get('jwt');

    if (token) {
      this.setState({ token, isAuthenticated: true });
    }
  }

  performAPICall(data) {
    const { token } = this.state;
    const { url, method = 'GET', payload } = data;

    return fetch(url, {
      method: method.toUpperCase(),
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : null),
      },
      ...(payload ? { body: JSON.stringify(payload) } : null),
    }).then((response) => response.json());
  }

  register(userInfo) {
    const { username, email, password } = userInfo;
    this.performAPICall({
      url: '/api/v1/users/register',
      method: 'POST',
      payload: { user_name: username, pass_word: password, email },
    })
      .then((data) => {
        cookies.set('jwt', data.token, { path: '/' });

        this.setState({
          isAuthenticated: true,
          loginFailed: false,
          user: data.data,
          token: data.token,
          wasRegistrationSuccessful: true,
        });
      })
      .catch((err) => {
        this.setState({ wasRegistrationSuccessful: false });
      });
  }

  login(userInfo) {
    const { usernameOrEmail, password } = userInfo;
    const { cookies } = this.props;

    this.performAPICall({
      url: '/api/v1/users/login',
      method: 'POST',
      payload: { user_name: usernameOrEmail, pass_word: password },
    })
      .then((data) => {
        if (data.token) {
          cookies.set('jwt', data.token, { path: '/' });

          this.setState({
            isAuthenticated: true,
            loginFailed: false,
            user: data.data,
            token: data.token,
          });
        } else {
          this.setState({ loginFailed: true });
        }
      })
      .catch((err) => {
        this.setState({ loginFailed: true });
      });
  }

  logout() {
    const { cookies } = this.props;
    cookies.remove('jwt', { path: '/' });
    this.setState({ isAuthenticated: false });
  }

  getAllStrategies() {
    const { user } = this.state;

    this.performAPICall({ url: `/api/v1/strategies/${user.id}` }).then((data) => {
      this.setState({ strategies: data });
    });
  }
  
  getStrategy() {

  }

  createStrategy() {
    
  }

  updateStrategy(){

  }

  deleteStrategy() {

  }


  render() {
    const {
      isAuthenticated,
      wasRegistrationSuccessful,
      user,
      loginFailed,
      strategies,
    } = this.state;

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
                loginFailed={loginFailed}
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
            performAPICall={this.performAPICall}
            user={user}
            isAuthenticated={isAuthenticated}
            component={Journals}
          />

          <ProtectedRoute
            exact
            path="/journals/view/:strategyId"
            user={user}
            performAPICall={this.performAPICall}
            isAuthenticated={isAuthenticated}
            component={ViewJournal}
          />

          <ProtectedRoute
            exact
            path="/strategies"
            user={user}
            strategies={strategies}
            getAllStrategies={this.getAllStrategies}
            isAuthenticated={isAuthenticated}
            component={Strategies}
          />

          <ProtectedRoute
            exact
            user={user}
            path="/strategies/view/:id"
            performAPICall={this.performAPICall}
            isAuthenticated={isAuthenticated}
            component={ViewStrategy}
          />
          <ProtectedRoute
            exact
            user={user}
            performAPICall={this.performAPICall}
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

export default withCookies(App);
