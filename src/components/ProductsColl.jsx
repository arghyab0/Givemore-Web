//components
import { useEffect } from "react";
import { Row, Col, Container, Form } from "react-bootstrap";
import { useHistory, useParams } from "react-router";
import Product from "./Product";
import LoadMore from "./LoadMore";

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
  const { data, queryDoc, isLastPage } = products;

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

  const handleLoadMore = () => {
    dispatch(
      fetchProductsStart({
        filterType,
        startAfterDoc: queryDoc,
        persistProducts: data,
      })
    );
  };

  if (!Array.isArray(data)) return null;
  if (data.length < 1) {
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
        <Row md="2" lg="4" className="g-4">
          {data.map((item, index) => {
            const {
              productTitle,
              productThumbnail,
              productCategory,
              documentID,
            } = item;

            if (!productTitle || !productThumbnail || !productCategory)
              return null;

            return (
              <Col key={documentID}>
                <Product {...item} />
              </Col>
            );
          })}
        </Row>
      </Container>
      {!isLastPage && (
        <Container>
          <Row className="justify-content-center">
            <Col sm="2">
              <LoadMore onLoadMore={handleLoadMore} />
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default ProductsColl;
