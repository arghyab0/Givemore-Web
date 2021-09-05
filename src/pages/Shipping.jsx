//components
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";

//redux stuff
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/cart.action";
import { createStructuredSelector } from "reselect";

//stylesheet
import "./shipping-styles.scss";
import { selectCartItemsCount } from "../redux/cart.selectors";

const initAddr = {
  line1: "",
  line2: "",
  city: "",
  state: "",
  pincode: "",
};

const mapState = createStructuredSelector({
  itemCount: selectCartItemsCount,
});

const Shipping = () => {
  const [name, setName] = useState("");
  const [shippingAddr, setShippingAddr] = useState({ ...initAddr });

  const { itemCount } = useSelector(mapState);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (itemCount < 1) {
      history.push("/");
    }
  }, [itemCount]);

  const handleFormSubit = async (e) => {
    e.preventDefault();

    if (
      !name ||
      !shippingAddr.line1 ||
      !shippingAddr.city ||
      !shippingAddr.state ||
      !shippingAddr.pincode
    )
      return;

    dispatch(clearCart());
  };

  const handleShipping = (e) => {
    const { name, value } = e.target;
    setShippingAddr({
      ...shippingAddr,
      [name]: value,
    });
  };

  return (
    <>
      <Container className="d-flex justify-content-center">
        <Row>
          <Col>
            <Form onSubmit={handleFormSubit}>
              <h3 className="text-center">Shipping</h3>
              <br />

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="4">
                  Name
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    required
                    name="name"
                    value={name}
                    type="text"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="4">
                  Line 1
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    required
                    name="line1"
                    value={shippingAddr.line1}
                    type="text"
                    placeholder="name"
                    onChange={handleShipping}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="4">
                  Line 2
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    name="line2"
                    value={shippingAddr.line2}
                    type="text"
                    placeholder="name"
                    onChange={handleShipping}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="4">
                  City
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    required
                    name="city"
                    value={shippingAddr.city}
                    type="text"
                    placeholder="name"
                    onChange={handleShipping}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="4">
                  State
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    required
                    name="state"
                    value={shippingAddr.state}
                    type="text"
                    placeholder="name"
                    onChange={handleShipping}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="4">
                  Pincode
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    required
                    name="pincode"
                    value={shippingAddr.pincode}
                    type="text"
                    placeholder="name"
                    onChange={handleShipping}
                  />
                </Col>
              </Form.Group>

              <div className="text-center">
                <Button type="submit" variant="primary">
                  Sign-up with email
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Shipping;
