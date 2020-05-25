import React from "react";
import { Link } from "react-router-dom";
import MenuIcon from "../assets/menu.png";
import nextId from "react-id-generator";

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: "/",
      isShowingMobile: false,
    };

    this.changeActivePage = this.changeActivePage.bind(this);
    this.showLinks = this.showLinks.bind(this);
    this.displayDesktopProtectedRoutesIfAuthenticated = this.displayDesktopProtectedRoutesIfAuthenticated.bind(
      this
    );
    this.displayMobileProtectedRoutesIfAuthenticated = this.displayMobileProtectedRoutesIfAuthenticated.bind(
      this
    );
  }

  componentDidMount() {
    const activePages = document.querySelectorAll(
      `a[href="${window.location.pathname}"]`
    );

    if (activePages.length) {
      activePages.forEach((link) => link.classList.add("active-page"));
    }
  }

  componentDidUpdate() {
    document.querySelectorAll(".active-page").forEach((link) => {
      link.classList.remove("active-page");
    });

    const activePages = document.querySelectorAll(
      `a[href="${window.location.pathname}"]`
    );

    if (activePages.length) {
      activePages.forEach((link) => link.classList.add("active-page"));
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

  displayMobileProtectedRoutesIfAuthenticated() {
    const { isAuthenticated } = this.props;
    if (isAuthenticated) {
      return [
        <li>
          <Link
            onClick={() => this.changeActivePage("/journals")}
            to="/journals"
          >
            Journals
          </Link>
        </li>,
        <li>
          <Link
            onClick={() => this.changeActivePage("/strategies")}
            to="/strategies"
          >
            Strategies
          </Link>
        </li>,
      ];
    }
  }

  displayDesktopProtectedRoutesIfAuthenticated() {
    const { isAuthenticated } = this.props;
    if (isAuthenticated) {
      return [
        <li key={nextId()}>
          <Link
            onClick={() => this.changeActivePage("/journals")}
            to="/journals"
          >
            Journals
          </Link>
        </li>,
        <li key={nextId()}>
          <Link
            onClick={() => this.changeActivePage("/strategies")}
            to="/strategies"
          >
            Strategies
          </Link>
        </li>,
      ];
    }
    return [];
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
          <span className="show-links-in-mobile" onClick={this.showLinks}>
            <img src={MenuIcon} alt="show nav links" />
          </span>
        </ul>
        {/* Desktop */}
        <ul className="nav-right-container">
          {this.displayDesktopProtectedRoutesIfAuthenticated()}
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
          {this.displayMobileProtectedRoutesIfAuthenticated()}
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
