import React from "react";
import { Helmet } from "react-helmet";
import {Link} from 'react-router-dom';

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
      <div>
          {this.head()}
        <h1>Home Page</h1>
      </div>
    );
  }
}

