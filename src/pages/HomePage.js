import React from "react";
import { Helmet } from "react-helmet";

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

