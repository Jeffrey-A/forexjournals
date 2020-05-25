import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// Styles
import "./styles/Main.css";
// Pages
import HomePage from "./pages/HomePage";
import Journals from "./pages/Journals";
import Strategies from "./pages/Strategies";
import CreateJournal from "./pages/CreateJournal";
import ViewJournal from "./pages/ViewJournal";
import CreateStrategy from "./pages/CreateStrategy";
import ViewStrategy from "./pages/ViewStrategy";
import NoFound from "./pages/NoFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Nav from "./components/Nav";

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      rest.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
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
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login() {
    this.setState({ isAuthenticated: true });
  }

  logout() {
    this.setState({ isAuthenticated: false });
  }

  render() {
    const { isAuthenticated } = this.state;

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
                login={this.login}
                {...props}
              />
            )}
          />
          <Route
            exact
            path="/register"
            render={(props) => (
              <Register isAuthenticated={isAuthenticated} {...props} />
            )}
          />
          <ProtectedRoute
            exact
            path="/journals"
            isAuthenticated={isAuthenticated}
            component={Journals}
          />

          <ProtectedRoute
            exact
            path="/journals/create"
            isAuthenticated={isAuthenticated}
            component={CreateJournal}
          />

          <ProtectedRoute
            exact
            path="/journals/view"
            isAuthenticated={isAuthenticated}
            component={ViewJournal}
          />

          <ProtectedRoute
            exact
            path="/strategies"
            isAuthenticated={isAuthenticated}
            component={Strategies}
          />

          <ProtectedRoute
            exact
            path="/strategies/create"
            isAuthenticated={isAuthenticated}
            component={CreateStrategy}
          />

          <ProtectedRoute
            exact
            path="/strategies/view"
            isAuthenticated={isAuthenticated}
            component={ViewStrategy}
          />
          <Route path="*" render={(props) => <NoFound />} />
        </Switch>
      </div>
    );
  }
}

export default App;
