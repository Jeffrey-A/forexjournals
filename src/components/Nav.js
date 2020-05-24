import React from "react";
import { Link, useLocation } from "react-router-dom";


class Nav extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    console.log(window.location.pathname);
  }

  render() {
    
    return (
      <div className='nav-main-container'>
        <ul className="nav-left-container">
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
        <ul className="nav-right-container">
          <li>
            <Link to="/journals">Journals</Link>
          </li>
          <li>
            <Link to="/strategies">Strategies</Link>
          </li>
          <li>
            <Link to="/login">Log in</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Nav;
