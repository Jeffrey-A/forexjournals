import React from "react";
import { Link } from "react-router-dom";
import MenuIcon from '../assets/menu.png';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: "/",
      isShowingMobile: false,
    };

    this.changeActivePage = this.changeActivePage.bind(this);
    this.showLinks = this.showLinks.bind(this);
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

    //Show menu in mobile 
    const mobileNav = document.querySelector(".mobile-nav-right-container");

    if (!mobileNav.classList.contains("hide")) {
      mobileNav.classList.add("hide");
    } else {
      mobileNav.classList.remove("hide");
    }
  }

  changeActivePage(route) {
    this.setState({ activePage: route });
  }

  showLinks() {
    this.setState((state, props) => {
      return {
        isShowingMobile: !state.isShowingMobile,
      };
    });
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
          <button className="show-links-in-mobile" onClick={this.showLinks}>
            <img src={MenuIcon} alt="show nav links" />
          </button>
        </ul>
        {/* Desktop */}
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

        {/* Mobile */}

        <ul className="mobile-nav-right-container hide">
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
