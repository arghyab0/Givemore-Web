//components
import { useEffect } from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { useParams, useHistory } from "react-router";

//redux stuff
import { useSelector, useDispatch } from "react-redux";
import { fetchProductStart, setProduct } from "../redux/product.action";
import { addProduct } from "../redux/cart.action";

//stylesheets
import "./productdetails-styles.scss";
import { MdAddShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";

const mapState = (state) => ({
  product: state.productsData.product,
});

const ProductDetails = () => {
  const { product } = useSelector(mapState);
  const { productTitle, productThumbnail, productDesc, productCategory } =
    product;

  const dispatch = useDispatch();
  const { productID } = useParams();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchProductStart(productID));

    return () => {
      dispatch(setProduct({}));
    };
  }, []);

  const handleAddToCart = (product) => {
    if (!product) return;
    dispatch(addProduct(product));
    history.push("/cart");
  };

  return (
    <>
      <Container>
        <Row className="mb-5"></Row>
        <Row className="mb-5">
          <Col>
            <h1 className="details-header">Listing details</h1>
          </Col>
        </Row>
        <Row>
          <Col md="6" style={{ padding: "0px 30px 0px" }}>
            <Image
              src={productThumbnail}
              alt={productTitle}
              style={{ borderRadius: "16px" }}
              fluid
            />
            <Row className="mb-5"></Row>
          </Col>
          <Col md="6" style={{ padding: "0px 20px 0px" }}>
            <Container>
              <Row className="mb-5">
                <h2 className="details-title">{productTitle}</h2>
              </Row>
              <Row className="mb-5">
                <p>{productDesc}</p>
              </Row>
              <Row className="mb-5">
                <p>
                  <span className="details-sub">Listing ID:</span> &ensp;{" "}
                  {productID}
                  <br />
                  <span className="details-sub">Category:</span> &ensp;
                  <Link to={`/store/${productCategory}`}>
                    {productCategory}
                  </Link>
                </p>
              </Row>
              <Row className="mb-5 justify-content-center">
                <Button
                  id="details-cart"
                  variant="primary"
                  onClick={() => handleAddToCart(product)}
                >
                  <MdAddShoppingCart style={{ fontSize: "19px" }} /> Add to Cart
                </Button>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProductDetails;
