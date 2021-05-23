import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import React, { Component } from 'react';
import { Col, Container, Row, Table, Button } from 'react-bootstrap';
import PageFooter from '../Components/PageFooter';
import UserContext from '../UserContext';

export default class Cart extends Component {

  static contextType = UserContext;

  state = {
    cart: [],
  };

  componentDidMount() {
    const { cart, removeNotiCount } = this.context;
    this.setState({ cart });
    removeNotiCount();
  }

  handleDelete = i => {
    let cart = this.state.cart;
    cart = cart.filter((data, index) => index != i);
    this.setState({ cart });
    localStorage.setItem("cartKey", JSON.stringify(cart));
  };

  handleChange = (event, i) => {
    let cart = this.state.cart;
    cart[i].quantity = event.target.value == 0 ? 1 : event.target.value > 10 ? 10 : event.target.value;
    this.setState({ cart });
    localStorage.setItem("cartKey", JSON.stringify(cart));
  };

  render() {
    const totalPrice = this.state.cart.reduce((a, b) => a + (b.price * b.quantity), 0);
    return (
      <>
        <Container className="pt-5">
          <Table hover bordered striped size="sm" responsive>
            <thead>
              <tr>
                <th>No.</th>
                <th>Title</th>
                <th>Size No.</th>
                <th>Qty</th>
                <th>Price $</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {this.state.cart.map((data, i) => {
                return (
                  <tr>
                    <td>{i + 1}</td>
                    <td>{data.title}</td>
                    <td>{data.sizeNo}</td>
                    <td><input className="incrementStyle" type="number" min="1" max="10" value={data.quantity} onChange={(event) => this.handleChange(event, i)} /></td>
                    <td>{data.price}</td>
                    <td>{data.price * data.quantity}</td>
                    <td className="deleteButtonStyle"><FontAwesomeIcon onClick={() => this.handleDelete(i)} icon={faTimesCircle} color="red" /></td>
                  </tr>
                )
              })}
            </tbody>
            <tbody>
              <tr>
                <td colSpan="5">Total Amount</td>
                <td>${totalPrice}</td>
              </tr>
            </tbody>
          </Table>
        </Container >
        <PageFooter className="footerStyle" />
      </>
    );
  }
}
