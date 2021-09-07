//components
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import CartProduct from "./CartProduct";

//redux stuff
import { useSelector } from "react-redux";
import { selectCartItems } from "../redux/cart.selectors";
import { createStructuredSelector } from "reselect";

//stylesheets
import "./checkout-styles.scss";
import { BiCheck } from "react-icons/bi";

const mapState = createStructuredSelector({
  cartItems: selectCartItems,
});

const Checkout = () => {
  const { cartItems } = useSelector(mapState);

  return (
    <>
      <Container>
        <Row className="mb-5"></Row>
        <Row className="mb-5">
          <Col>
            <h1 className="cart-header">Your cart</h1>
          </Col>
        </Row>

        {cartItems.length > 0 ? (
          <>
            {cartItems.map((item, index) => {
              return (
                <Row className="mb-5">
                  <CartProduct {...item} key={item.documentID} />
                </Row>
              );
            })}

            <br />
            <br />

            <Row className="text-center">
              <Col>
                <Link to="/store">
                  <Button id="cart-continue">Continue browsing</Button>
                </Link>
              </Col>
              <Col>
                <Link to="/shipping">
                  <Button id="cart-checkout">
                    <BiCheck className="cart-icons" />
                    &ensp;Checkout
                  </Button>
                </Link>
              </Col>
            </Row>
          </>
        ) : (
          <>
            <p style={{ color: "rgba(0,0,0,0.7)", fontWeight: "500" }}>
              There are no items in your cart. Please visit the{" "}
              <Link to="/store">store</Link> to add items to your cart.
            </p>
          </>
        )}
      </Container>
    </>
  );
};

export default Checkout;
