import React from "react";
import { Helmet } from "react-helmet";
import {Link} from 'react-router-dom';
import CreateStrategy from '../components/CreateStrategy';

export default class HomePage extends React.Component {
  head() {
    return (
      <Helmet>
        <title>Forex Journals</title>
      </Helmet>
    );
  }
  render() {
    return (
      <div className='container'>
          {this.head()}
          <CreateStrategy />
      </div>
    );
  }
}

