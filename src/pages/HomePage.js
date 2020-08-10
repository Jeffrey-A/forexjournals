import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Strategies from './Strategies';
import CreateStrategy from '../components/CreateStrategy';
import CreateJournal from '../components/CreateJournal';

export default class HomePage extends React.Component {
  head() {
    return (
      <Helmet>
        <title>Forex Journals</title>
      </Helmet>
    );
  }
  render() {
    const { user, isAuthenticated } = this.props;
    return (
      <div className="container">
        {this.head()}
        <h1>Welcome Page</h1>
      </div>
    );
  }
}
