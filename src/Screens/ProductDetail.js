import API from '@aws-amplify/api';
import React, { Component } from 'react';
import { Button, Image, Row, Col, Container, Table, Card, SplitButton, Dropdown, Form } from 'react-bootstrap';
import PageFooter from '../Components/PageFooter';
import UserContext from '../UserContext';

export default class ProductDetail extends Component {
  static contextType = UserContext;

  state = {
    product: {},
    quantity: 1,
    isLoading: true
  }

  componentDidMount() {
    console.log(this.props.match.params._id);
    this.fetchProduct();
  }

  fetchProduct = async () => {
    try {
      const product = await API.get("zack-com-product", `products/${this.props.match.params._id}`);
      this.setState({ product, isLoading: false });
    } catch (e) {
      console.log(e);
    }
  };

  handleClick = () => {
    const { addCart, setNotiCount } = this.context;
    const cartProduct = { title: this.state.product.title, price: this.state.product.price, sizeNo: this.state.product.sizeNo, quantity: this.state.quantity }
    addCart(cartProduct);
    setNotiCount();
    this.props.history.goBack();
  };

  handleChange = event => {
    this.setState({ quantity: event.target.value });
  };

  render() {
    return !this.state.isLoading && (
      <>
        <Container className="pt-5">
          <Row>
            <Col className="mb-3" md="6">
              <Image src={this.state.product.imgUrl} fluid />
            </Col>
            <Col className="mx-3">
              <Row >
                <Card as={Col}>
                  <h3>{this.state.product.title}</h3>
                  <Table responsive className="text-left">
                    <tbody>
                      <tr>
                        <td className="font-weight-bold">Brand</td>
                        <td>{this.state.product.brand}</td>
                      </tr>
                      <tr>
                        <td className="font-weight-bold">Description</td>
                        <td>{this.state.product.description}</td>
                      </tr>
                      <tr>
                        <td className="font-weight-bold">Price</td>
                        <td>${this.state.product.price}</td>
                      </tr>
                      <tr>
                        <td className="font-weight-bold">Available Size</td>
                        <td>{this.state.product.sizeNo}</td>
                      </tr>
                      <tr>
                        <td className="font-weight-bold">Review</td>
                        <td>{this.state.product.review} Star</td>
                      </tr>
                    </tbody>
                  </Table>
                </Card>
              </Row>
              <Row className="mt-3">
                <Card as={Col} lg="6" md="7" sm="6" xs="7" className="m-auto pb-3">
                  <Table responsive className="text-left">
                    <tbody>
                      <tr>
                        <td className="font-weight-bold">Size</td>
                        <td>
                          <Form.Control as="select" size="sm" custom>
                            <option>{this.state.product.sizeNo}</option>
                          </Form.Control>
                        </td>
                      </tr>
                      <tr>
                        <td className="font-weight-bold">Quantity</td>
                        <td>
                          <Form.Control as="select" size="sm" custom value={this.state.quantity} onChange={event => this.handleChange(event)}>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                          </Form.Control>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                  <Button className="m-auto" onClick={this.handleClick}>Add to card</Button>
                </Card>
              </Row>
            </Col>
          </Row>
        </Container>
        <PageFooter className="footerStyle" />
      </>
    );
  }
}
