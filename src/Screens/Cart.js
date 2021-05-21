import React, { Component } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import PageFooter from '../Components/PageFooter';
import UserContext from '../UserContext';

export default class Cart extends Component {

  static contextType = UserContext;

  state = {
    cart: [],
  };

  componentDidMount() {
    const { cart } = this.context;
    this.setState({ cart });
  }

  render() {
    const totalPrice = this.state.cart.reduce((a, b) => a + (b.price * b.quantity), 0);
    return (
      <>
        <Container className="pt-5">
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>No.</th>
                <th>Title</th>
                <th>Size Number</th>
                <th>Quantity</th>
                <th>Price</th>
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
                    <td>{data.quantity}</td>
                    <td>{data.price}</td>
                    <td>{data.price * data.quantity}</td>
                  </tr>
                )
              })}
            </tbody>
            <tbody>
              <tr>
                <td colSpan="5">Total Amount</td>
                <td>{totalPrice}</td>
              </tr>
            </tbody>
          </Table>
        </Container >
        <PageFooter className="footerStyle" />
      </>
    );
  }
}
