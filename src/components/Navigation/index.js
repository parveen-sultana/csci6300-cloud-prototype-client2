import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import Auth from '../../modules/Auth';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.navBarToggle = this.navBarToggle.bind(this);
    this.state = {
      isOpen: false,
      authenticated: Auth.isUserAuthenticated()
    };
  }
  
  navBarToggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  componentDidMount() {
    // check if user is logged in on refresh
    this.props.toggleAuthenticateStatus()
  }
  
  render() {
    return(
      <div>
        <Navbar color="" light expand="md">
          <NavbarBrand href="/">Cloud Prototype Client 2</NavbarBrand>
          <NavbarToggler onClick={this.navBarToggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            
              {!this.state.authenticated ? (
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink href="/server1/login">Login1</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/server1/register">Register1</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/server2/login">Login2</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/server2/register">Register2</NavLink>
                  </NavItem>
                </Nav>
                ) : (
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink href="/logout">Logout</NavLink>
                  </NavItem>
                </Nav>
                )}
            
          </Collapse>
        </Navbar>
      </div>
    )
  }
}

export default Navigation;