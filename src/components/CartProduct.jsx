//components
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

//redux stuff
import { useDispatch } from "react-redux";
import {
  removeCartItem,
  addProduct,
  reduceCartItem,
} from "../redux/cart.action";

//stylesheets
import "./cartproduct-styles.scss";
import { BiPlus, BiMinus, BiX } from "react-icons/bi";

const CartProduct = (product) => {
  const dispatch = useDispatch();

  const handleRemoveCartItem = (documentID) => {
    dispatch(removeCartItem({ documentID }));
  };

  const handleAddProduct = (product) => {
    dispatch(addProduct(product));
  };

  const handleReduceProduct = (product) => {
    dispatch(reduceCartItem(product));
  };

  const { productTitle, productThumbnail, quantity, documentID } = product;

  return (
    <>
      <Container>
        <Row>
          <Col xs="4" className="text-center">
            <Link to={`/store/${documentID}`}>
              <Image
                src={productThumbnail}
                alt={productTitle}
                style={{ borderRadius: "14px" }}
                fluid
              />
            </Link>
          </Col>
          <Col style={{ padding: "0px 30px" }}>
            <Row className="mb-2">
              <Link to={`/store/${documentID}`}>
                <h3 className="cart-product-header">{productTitle}</h3>
              </Link>
              <p className="cart-product-id"> ID:&ensp;{documentID}</p>
            </Row>
            <Row>
              <p>Quantity:&ensp;{quantity}</p>
            </Row>
            <Row>
              <Col>
                <Button
                  id="checkout-quantity"
                  onClick={() => handleAddProduct(product)}
                >
                  <BiPlus id="checkout-icons" />
                </Button>
              </Col>
              <Col>
                <Button
                  id="checkout-quantity"
                  onClick={() => handleReduceProduct(product)}
                >
                  <BiMinus id="checkout-icons" />
                </Button>
              </Col>

              <Col>
                <Button
                  id="checkout-delete"
                  onClick={() => handleRemoveCartItem(documentID)}
                >
                  <BiX id="checkout-icons" />
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CartProduct;
