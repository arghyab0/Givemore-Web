//components
import { Row, Col, Container } from "react-bootstrap";
import Checkout from "../components/Checkout";

//stylesheets
import "./cart-styles.scss";

import React from "react";

const Cart = () => {
  return (
    <>
      <Container>
        <Row>
          <Col sm="2"></Col>
          <Col sm="8">
            <Checkout />
          </Col>
          <Col sm="2"></Col>
        </Row>
      </Container>
    </>
  );
};

export default Cart;
