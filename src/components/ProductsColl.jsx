//components
import { useEffect } from "react";
import { Row, Col, Container, Form } from "react-bootstrap";
import Product from "./Product";
import { useHistory, useParams } from "react-router";

//redux stuff
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsStart } from "../redux/product.action";

//stylesheet
import "./productscoll-styles.scss";

const mapState = ({ productsData }) => ({
  products: productsData.products,
});

const ProductsColl = (props) => {
  const { products } = useSelector(mapState);

  const dispatch = useDispatch();
  const history = useHistory();
  const { filterType } = useParams();

  useEffect(() => {
    dispatch(fetchProductsStart({ filterType }));
  }, [filterType]);

  const handleFilter = (e) => {
    const categoryFilter = e.target.value;
    const filter = categoryFilter === "all" ? "" : categoryFilter;
    history.push(`/store/${filter}`);
  };

  if (!Array.isArray(products)) return null;
  if (products.length < 1) {
    return (
      <>
        <h3>No products found</h3>
      </>
    );
  }

  return (
    <>
      <Container>
        <Row className="mb-2">
          <Col sm="3">
            <h2>Browse products</h2>
          </Col>
          <Col sm="9">
            <Col sm="2">
              <Form.Control as="select" onChange={handleFilter}>
                <option value="all">Show all</option>
                <option value="cat1">Cat1</option>
                <option value="cat2">Cat2</option>
                <option value="cat3">Cat3</option>
              </Form.Control>
            </Col>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row sm={1} lg={4} className="g-4">
          {products.map((item, index) => {
            const {
              productTitle,
              productThumbnail,
              productCategory,
              documentID,
            } = item;

            if (!productTitle || !productThumbnail || !productCategory)
              return null;

            return (
              <Col>
                <Product {...item} key={documentID} />
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default ProductsColl;
