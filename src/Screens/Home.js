import React, { Component } from 'react';
import { Card, Col, Container, Image, Row } from 'react-bootstrap';

import { API } from 'aws-amplify';
import ZLogo from '../Images/Z-Logo.png';

class Home extends Component {

  state = {
    productList: []
  };

  componentDidMount() {
    this.fetchProducts();
    // this.props.fetchProductList();
  }

  fetchProducts = async () => {
    try {
      const productList = await API.get("zack-com-product", 'products');
      this.setState({ productList })
    } catch (e) {
      console.log(e);
    }
  }

  handleClick = (_id) => {
    this.props.history.push(`/productdetail/${_id}`);
  }
  render() {
    console.log(this.state.productList);
    return (
      <Container fluid>
        <Row className="justify-content-md-center" style={{ backgroundImage: `url(${ZLogo})`, backgroundPosition: "center", backgroundRepeat: 'no-repeat', backgroundSize: "cover", height: "100%" }}>
          <Col><h1 className="text-white py-5">Welcome to "ZACK-COM"</h1>
            <h1 className="text-white py-5" style={{ marginTop: "300px" }}>Easy Fast Reliable</h1></Col>
        </Row>
        <Col className="my-5">
          <h2>Get your Shoes!</h2>
        </Col>
        <Row className="justify-content-md-center">
          {this.state.productList.map(product => {
            return (
              <Col className="my-2" key={product.productId} xs={12} sm={6} md={4} lg={3}>
                <Card className="animation m-auto" style={{ borderRadius: "5%", width: '17rem' }} onClick={() => this.handleClick(product.productId)}>
                  <Card.Img variant="top" src={product.imgUrl} style={{ padding: "0.3rem", borderRadius: "5%", height: "19rem" }} />
                  <Card.Body style={{ textAlign: "start" }}>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>${product.price}</Card.Text>
                    <Card.Subtitle className="text-muted">{product.review} Star</Card.Subtitle>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    );
  }
}

export default Home;
