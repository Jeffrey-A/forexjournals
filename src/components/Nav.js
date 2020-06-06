import React from "react";
import { Link } from "react-router-dom";
import MenuIcon from "../assets/menu.png";
import nextId from "react-id-generator";

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobileMenuExpanded: false,
    };

    this.expandMobileNav = this.expandMobileNav.bind(this);
    this.displayRoutes = this.displayRoutes.bind(this);
  }

  expandMobileNav() {
    this.setState((state, props) => {
      return {
        isMobileMenuExpanded: !state.isMobileMenuExpanded,
      };
    });
  }

  displayRoutes() {
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
        <Link to="/register">Register</Link>
      </li>,
      <li key={nextId()}>
        <Link to="/login">Log in</Link>
      </li>,
    ];
  }

  render() {
    const { isMobileMenuExpanded } = this.state;

    const mobileNavClasses = !isMobileMenuExpanded
      ? "mobile-nav-right-container hide"
      : "mobile-nav-right-container";

    return (
      <div className="nav-main-container">
        <ul className="nav-left-container">
          <li>
            <Link to="/">FX JOURNALS</Link>
          </li>
          <span className="show-links-in-mobile" onClick={this.expandMobileNav}>
            <img src={MenuIcon} alt="show nav links" />
          </span>
        </ul>

        {/* Desktop */}
        <ul className="nav-right-container">{this.displayRoutes()}</ul>

        {/* Mobile */}
        <ul className={mobileNavClasses}>{this.displayRoutes()}</ul>
      </div>
    );
  }
}

export default Nav;
