import { Auth } from 'aws-amplify';
import React, { Component} from 'react';
import { Nav, Navbar} from 'react-bootstrap';
import UserContext from '../UserContext';

export default class PageNav extends Component {

  static contextType = UserContext

  componentDidMount(){
    const definedAuth = this.context;
    console.log(definedAuth);
    console.log("runNav");
  }

  handleSignOut = async()=> {
    try{
      await Auth.signOut().catch(data=> console.log('singoutSuccess', data));
      this.definedAuth.unsetAuthenticated();
    } catch(error) {
      console.log(error);
    }
  }

  render() {
    const {isAuthenticated} = this.context;
    console.log(isAuthenticated);
    return (
      <div style={{marginBottom:"55px"}}>
        <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">ZACK-COM</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/cart">Cart</Nav.Link>
          </Nav>
          {!isAuthenticated ?
          (<Nav className="ml-auto">
            <Nav.Link eventKey={1} href="/signup">
              Sign up
            </Nav.Link>
            <Nav.Link eventKey={2} href="/login">
              Log in
            </Nav.Link>
          </Nav>) :
          (<Nav className="ml-auto">
            <Nav.Link onClick={this.handleSignOut}>
              Sign Out
            </Nav.Link>
          </Nav>)}
          </Navbar.Collapse>
      </Navbar>
      </div>
    );
  }
}
