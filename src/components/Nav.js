import React from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '../assets/menu.png';
import nextId from 'react-id-generator';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobileMenuExpanded: false,
    };

    this.expandCloseMobileNav = this.expandCloseMobileNav.bind(this);
    this.displayLinks = this.displayLinks.bind(this);
    this.closeMobileNav = this.closeMobileNav.bind(this);
    this.closeMobileNavAndLogout = this.closeMobileNavAndLogout.bind(this);
  }

  expandCloseMobileNav() {
    this.setState((state, props) => {
      return {
        isMobileMenuExpanded: !state.isMobileMenuExpanded,
      };
    });
  }

  closeMobileNav() {
    this.setState({ isMobileMenuExpanded: false });
  }

  closeMobileNavAndLogout() {
    this.setState({ isMobileMenuExpanded: false }, () => {
      this.props.logout();
    });
  }

  displayLinks() {
    const { isAuthenticated } = this.props;
    if (isAuthenticated) {
      return [
        <li key={nextId()}>
          <Link onClick={this.closeMobileNav} to="/strategies">
            Strategies
          </Link>
        </li>,
        <li key={nextId()}>
          <Link onClick={this.closeMobileNavAndLogout} to="/">
            Log out
          </Link>
        </li>,
      ];
    }
    return [
      <li key={nextId()}>
        <Link onClick={this.closeMobileNav} to="/register">
          Register
        </Link>
      </li>,
      <li key={nextId()}>
        <Link onClick={this.closeMobileNav} to="/login">
          Log in
        </Link>
      </li>,
    ];
  }

  render() {
    const { isMobileMenuExpanded } = this.state;

    const mobileNavClasses = !isMobileMenuExpanded
      ? 'mobile-nav-right-container hide'
      : 'mobile-nav-right-container';

    return (
      <div className="nav-main-container">
        <ul className="nav-left-container">
          <li>
            <Link onClick={this.closeMobileNav} to="/">
              FX JOURNALS
            </Link>
          </li>
          <span
            className="show-links-in-mobile"
            onClick={this.expandCloseMobileNav}
          >
            <img src={MenuIcon} alt="show nav links" />
          </span>
        </ul>

        {/* Desktop */}
        <ul className="nav-right-container">{this.displayLinks()}</ul>

        {/* Mobile */}
        <ul className={mobileNavClasses}>{this.displayLinks()}</ul>
      </div>
    );
  }
}

export default Nav;
