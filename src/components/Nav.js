import React from "react";
import { Link } from "react-router-dom";
import MenuIcon from "../assets/menu.png";
import nextId from "react-id-generator";

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowingMobile: false,
    };

    this.showLinks = this.showLinks.bind(this);
    this.displayDesktopProtectedRoutesIfAuthenticated = this.displayDesktopProtectedRoutesIfAuthenticated.bind(
      this
    );
    this.displayMobileProtectedRoutesIfAuthenticated = this.displayMobileProtectedRoutesIfAuthenticated.bind(
      this
    );
  }

  componentDidUpdate() {
    //Show menu in mobile
    const mobileNav = document.querySelector(".mobile-nav-right-container");

    if (!mobileNav.classList.contains("hide")) {
      mobileNav.classList.add("hide");
    } else {
      mobileNav.classList.remove("hide");
    }
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
          <Link to="/journals">Journals</Link>
        </li>,
        <li>
          <Link to="/strategies">Strategies</Link>
        </li>,
        <li key={nextId()}>
          <Link onClick={() => this.props.logout()} to="/">
            Log out
          </Link>
        </li>,
      ];
    }

    return [
      <li key={nextId()}>
        <Link to="/login">Log in</Link>
      </li>,
      <li key={nextId()}>
        <Link to="/register">Register</Link>
      </li>,
    ];
  }

  displayDesktopProtectedRoutesIfAuthenticated() {
    const { isAuthenticated } = this.props;
    if (isAuthenticated) {
      return [
        <li key={nextId()}>
          <Link to="/journals">Journals</Link>
        </li>,
        <li key={nextId()}>
          <Link to="/strategies">Strategies</Link>
        </li>,
        <li key={nextId()}>
          <Link onClick={() => this.props.logout()} to="/">
            Log out
          </Link>
        </li>,
      ];
    }
    return [
      <li key={nextId()}>
        <Link to="/login">Log in</Link>
      </li>,
      <li key={nextId()}>
        <Link to="/register">Register</Link>
      </li>,
    ];
  }

  render() {
    return (
      <div className="nav-main-container">
        <ul className="nav-left-container">
          <li>
            <Link to="/">FX JOURNALS</Link>
          </li>
          <span className="show-links-in-mobile" onClick={this.showLinks}>
            <img src={MenuIcon} alt="show nav links" />
          </span>
        </ul>

        {/* Desktop */}
        <ul className="nav-right-container">
          {this.displayDesktopProtectedRoutesIfAuthenticated()}
        </ul>

        {/* Mobile */}
        <ul className="mobile-nav-right-container hide">
          {this.displayMobileProtectedRoutesIfAuthenticated()}
        </ul>
      </div>
    );
  }
}

export default Nav;
