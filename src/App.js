// import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Auth } from 'aws-amplify';
import React, { Component } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import AuthRoute from './Components/AuthRoute';
import PageFooter from './Components/PageFooter';
import PageNav from './Components/PageNav';
import Cart from './Screens/Cart';
import Home from './Screens/Home';
import Login from './Screens/Login';
import ProductDetail from './Screens/ProductDetail';
import Signup from './Screens/Signup';

import { UserProvider } from './UserContext';

class App extends Component {

  state = {
    isLoading: true,
    isAuthenticated: false,
    user: {},
    cart: JSON.parse(localStorage.getItem("cartKey")) || []
  };

  componentDidMount() {
    this.loadSectionForAuth();
  }

  loadSectionForAuth = async () => {
    try {
      await Auth.currentSession();
      const user = await Auth.currentAuthenticatedUser();
      this.setState({ isAuthenticated: true, user });
    } catch (error) {
      if (error !== 'No current user') {
        alert(error);
      }
    }
    this.setState({ isLoading: false });
  }

  setAuthenticated = () => {
    this.setState({ isAuthenticated: true });
  }

  addCart = props => {
    const cart = this.state.cart;
    cart.push(props);
    localStorage.setItem("cartKey", JSON.stringify(cart));
  }

  handleSignOut = async () => {
    try {
      await Auth.signOut();
      this.setState({ isAuthenticated: false })
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    console.log("User", this.state.user);
    console.log("Auth", this.state.isAuthenticated);
    const { isAuthenticated, cart } = this.state;
    const { setAuthenticated, addCart } = this;

    return (
      !this.state.isLoading &&
      <div className="App">
        <div style={{ marginBottom: "55px" }}>
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
                  <Nav.Link>
                    <FontAwesomeIcon icon={faUser} />{" "}{this.state.user.username}
                  </Nav.Link>
                  <Nav.Link eventKey={2} onClick={this.handleSignOut}>
                    Sign Out
                </Nav.Link>
                </Nav>)}
            </Navbar.Collapse>
          </Navbar>
        </div>
        <UserProvider value={{ isAuthenticated, cart, setAuthenticated, addCart }}>
          {/* <PageNav/> */}
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/productdetail/:_id" exact component={ProductDetail} />
            <AuthRoute path="/cart" exact><Cart /></AuthRoute>
          </Switch>
        </UserProvider>
      </div>
    )
  };
}

export default App;
