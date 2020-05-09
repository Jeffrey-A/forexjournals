import React from "react";
import HomePage from "./pages/HomePage";
import { Switch, Route } from "react-router-dom";


class App extends React.Component {
  render() {
    return (
      <Switch>
          <Route path='/' render={ props => (<HomePage />)} />
      </Switch>
    );
  }
}

export default App;