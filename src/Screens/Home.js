import React, { Component } from 'react';
import { Card, Col, Container, Image, Row } from 'react-bootstrap';

import { API } from 'aws-amplify';
import PageFooter from '../Components/PageFooter';
import UserContext from '../UserContext';

class Home extends Component {

  state = {
    productList: [],
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
        <Row className="justify-content-md-center bgStyle">
          <Col>
            <h1 className="text-white py-5">Welcome to "ZACK-COM"</h1>
            <h2 className="text-white py-5 quoteStyle" style={{ wordSpacing: "10vw", marginTop: "300px" }}>Easy - Fast - Reliable</h2>
          </Col>
        </Row>
        <Col className="my-5 ">
          <h2 className="titleStyle">Get your Shoes!</h2>
        </Col>
        <Row className="justify-content-md-center">
          {this.state.productList.map(product => {
            return (
              <Col className="my-3" key={product.productId} xs={12} sm={6} md={4} lg={3}>
                <Card className="cardStyle m-auto" onClick={() => this.handleClick(product.productId)}>
                  <div className="imgDiv">
                    <Card.Img variant="top" src={product.imgUrl} alt={product.title} className="imageStyle" />
                  </div>
                  <Card.Body className="text-left">
                    <Card.Title className="font-weight-bold">{product.title}</Card.Title>
                    <Card.Text className="font-weight-normal">${product.price}</Card.Text>
                    <Card.Subtitle className="text-muted">{product.review} Star</Card.Subtitle>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
        <PageFooter />
      </Container>
    );
  }
}

export default Home;
