//components
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

//redux stuff
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/cart.action";

//stylesheet
import "./product-styles.scss";

const Product = (product) => {
  const {
    productTitle,
    productThumbnail,
    productDesc,
    productCategory,
    documentID,
  } = product;

  const dispatch = useDispatch();
  const history = useHistory();

  const handleAddToCart = (product) => {
    if (!product) return;
    dispatch(addProduct(product));
    history.push("/cart");
  };

  if (!productTitle || !productThumbnail || !productCategory) return null;

  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Link to={`/product/${documentID}`}>
          <Card.Img variant="top" src={productThumbnail} alt={productTitle} />
        </Link>
        <Card.Body>
          <Card.Title>
            <Link to={`/product/${documentID}`}>{productTitle}</Link>
          </Card.Title>
          <Card.Text>{productCategory}</Card.Text>
          <Container>
            <Row>
              <Col>
                <Link to={`/product/${documentID}`}>
                  <Button variant="primary">Details</Button>
                </Link>
              </Col>
              <Col>
                <Button
                  variant="primary"
                  onClick={() => handleAddToCart(product)}
                >
                  Cart
                </Button>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </>
  );
};

export default Product;
