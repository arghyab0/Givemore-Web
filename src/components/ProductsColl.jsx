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
        <Container>
          <Row className="mb-5"></Row>
          <Row className="mb-5">
            <Col>
              <h1 className="store-header">Uh-oh, no listings found :(</h1>
              <br />
              <p>Sorry, we couldn't find what you are looking for.</p>
            </Col>
          </Row>
        </Container>
      </>
    );
  }

  return (
    <>
      <Container>
        <Row className="mb-5"></Row>
        <Row className="mb-5">
          <Col>
            <h1 className="store-header">Browse listings</h1>
          </Col>
          <Col xs="auto"></Col>
          <Col xs="4" sm="2">
            <Form.Control
              className="category-selector"
              as="select"
              onChange={handleFilter}
            >
              <option value="all">Show all</option>
              <option value="cat1">Cat1</option>
              <option value="cat2">Cat2</option>
              <option value="cat3">Cat3</option>
            </Form.Control>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row md="2" lg="4" className=" justify-content-space-evenly g-5">
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
        <>
          <br />
          <br />
          <Container>
            <Row className="justify-content-center text-center">
              <Col sm="2">
                <LoadMore onLoadMore={handleLoadMore} />
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
};

export default ProductsColl;
