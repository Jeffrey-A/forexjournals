import React from "react";
import HomePage from "./pages/HomePage";
import Journals from "./pages/Journals";
import Strategies from './pages/Strategies';
import { Switch, Route } from "react-router-dom";


class App extends React.Component {
  render() {
    return (
      <Switch>
          <Route exact path='/' render={ props => (<HomePage {...props} />)} />
          <Route exact path='/journals' render={ props => (<Journals  {...props} />)} />
          <Route exact path='/strategies' render={ props => (<Strategies  {...props} />)} />
      </Switch>
    );
  }
}

export default App;