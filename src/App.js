import React from "react";
import { Switch, Route } from "react-router-dom";
// Pages
import HomePage from "./pages/HomePage";
import Journals from "./pages/Journals";
import Strategies from './pages/Strategies';
import CreateJournal from './pages/CreateJournal';
import ViewJournal from './pages/ViewJournal';
import CreateStrategy from './pages/CreateStrategy';
import ViewStrategy from './pages/ViewStrategy';


class App extends React.Component {
  render() {
    return (
      <Switch>
          <Route exact path='/' render={ props => (<HomePage {...props} />)} />
          <Route exact path='/journals' render={ props => (<Journals  {...props} />)} />
          <Route exact path='/journals/create' render={ props => (<CreateJournal  {...props} />)} />
          <Route exact path='/journals/view' render={ props => (<ViewJournal  {...props} />)} />
          <Route exact path='/strategies' render={ props => (<Strategies  {...props} />)} />
          <Route exact path='/strategies/create' render={ props => (<CreateStrategy  {...props} />)} />
          <Route exact path='/strategies/view' render={ props => (<ViewStrategy  {...props} />)} />
      </Switch>
    );
  }
}

export default App;