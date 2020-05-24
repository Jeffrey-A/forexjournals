import React from "react";
import { Link } from "react-router-dom";

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: "/",
    };

    this.changeActivePage = this.changeActivePage.bind(this);
  }

  componentDidMount() {
    const activePage = document.querySelector(
      `a[href="${window.location.pathname}"]`
    );

    if (activePage) {
      activePage.classList.add("active-page");
    }
  }

  componentDidUpdate() {
    document.querySelectorAll(".active-page").forEach((link) => {
      link.classList.remove("active-page");
    });

    const activePage = document.querySelector(
      `a[href="${window.location.pathname}"]`
    );

    if (activePage) {
      activePage.classList.add("active-page");
    }
  }

  changeActivePage(route) {
    this.setState({ activePage: route });
  }

  render() {
    return (
      <div className="nav-main-container">
        <ul className="nav-left-container">
          <li>
            <Link onClick={() => this.changeActivePage("/")} to="/">
              Home
            </Link>
          </li>
        </ul>
        <ul className="nav-right-container">
          <li>
            <Link
              onClick={() => this.changeActivePage("/journals")}
              to="/journals"
            >
              Journals
            </Link>
          </li>
          <li>
            <Link
              onClick={() => this.changeActivePage("/strategies")}
              to="/strategies"
            >
              Strategies
            </Link>
          </li>
          <li>
            <Link onClick={() => this.changeActivePage("/login")} to="/login">
              Log in
            </Link>
          </li>
          <li>
            <Link
              onClick={() => this.changeActivePage("/register")}
              to="/register"
            >
              Register
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Nav;
