//components
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

//redux stuff
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/cart.action";

//stylesheet
import "./product-styles.scss";
import { BiHeart } from "react-icons/bi";
import { TiTags } from "react-icons/ti";

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
      <Container>
        <Row>
          <Col>
            <Card style={{ width: "18rem", borderRadius: "12px" }}>
              <Link to={`/product/${documentID}`}>
                <div className="product-card-img-container">
                  <Card.Img
                    className="product-card-img"
                    variant="top"
                    src={productThumbnail}
                    alt={productTitle}
                  />
                </div>
              </Link>
              <Card.Body>
                <Card.Title>
                  <Link
                    className="product-card-title"
                    to={`/product/${documentID}`}
                  >
                    {productTitle}
                  </Link>
                </Card.Title>
                <Card.Text>
                  <TiTags /> {productCategory}
                </Card.Text>
                <Container>
                  <Row className="justify-content-space-evenly">
                    <Col>
                      <Button
                        id="product-card-cart"
                        variant="primary"
                        onClick={() => handleAddToCart(product)}
                      >
                        <BiHeart /> Cart
                      </Button>
                    </Col>
                    <Col>
                      <Link to={`/product/${documentID}`}>
                        <Button id="product-card-details" variant="primary">
                          Details
                        </Button>
                      </Link>
                    </Col>
                  </Row>
                </Container>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Product;
