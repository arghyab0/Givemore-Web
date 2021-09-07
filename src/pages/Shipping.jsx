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
      <Container>
        <Row>
          <Col sm="3"></Col>
          <Col sm="6">
            <Form id="shipping-form" onSubmit={handleFormSubit}>
              <Container>
                <Row>
                  <h1 id="shipping-header">Checkout</h1>
                </Row>
                <Row>
                  <p>Enter your shipping details.</p>
                </Row>
                <br />

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="4">
                    Full name
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      required
                      name="name"
                      value={name}
                      type="text"
                      placeholder="recipient's name"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="4">
                    Address (line 1)
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      required
                      name="line1"
                      value={shippingAddr.line1}
                      type="text"
                      placeholder="flat or house no, apartment"
                      onChange={handleShipping}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="4">
                    Address (line 2)
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      name="line2"
                      value={shippingAddr.line2}
                      type="text"
                      placeholder="area, street, sector, village "
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
                      placeholder="city or town"
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
                      placeholder="state"
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
                      placeholder="6 digits [0-9] PIN code"
                      onChange={handleShipping}
                    />
                  </Col>
                </Form.Group>

                <br />
                <br />

                <div className="text-center">
                  <Button id="shipping-btn" type="submit" variant="primary">
                    Place request
                  </Button>
                </div>
              </Container>
            </Form>
          </Col>
          <Col sm="3"></Col>
        </Row>
      </Container>
    </>
  );
};

export default Shipping;
