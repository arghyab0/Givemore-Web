//components
import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import AddModal from "../components/AddModal";
import LoadMore from "../components/LoadMore";

//redux stuff
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProductsStart,
  deleteProductStart,
} from "../redux/product.action";

//stylesheets
import "./donate-styles.scss";
import { BiPlus } from "react-icons/bi";
import { TiCancel } from "react-icons/ti";

const mapState = ({ user, productsData }) => ({
  currentUser: user.currentUser,
  products: productsData.products,
});

const Donate = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const { currentUser, products } = useSelector(mapState);
  const { data, queryDoc, isLastPage } = products;
  const { displayName, userID } = currentUser;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductsStart());
  }, []);

  const handleLoadMore = () => {
    dispatch(
      fetchProductsStart({ startAfterDoc: queryDoc, persistProducts: data })
    );
  };

  return (
    <>
      {/* {!isLastPage && <LoadMore onLoadMore={handleLoadMore} />} */}

      <Container>
        <Row>
          <Col sm="2"></Col>
          <Col sm="8">
            <Container id="donate-container">
              <Row className="mb-5">
                <h1 id="donate-header">Hello, {displayName}</h1>
              </Row>
              <Row className="text-center mb-5">
                <Col>
                  <Button
                    id="add-donation"
                    variant="primary"
                    onClick={() => setModalShow(true)}
                  >
                    <BiPlus id="donate-icons" />
                    &ensp;List new donation
                  </Button>
                </Col>
              </Row>

              <AddModal show={modalShow} onHide={() => setModalShow(false)} />

              <br />
              <br />

              <Row className="mb-5">
                <h3 id="donate-header">Your current donation listings</h3>
              </Row>

              <Row>
                {Array.isArray(data) &&
                  data.length > 0 &&
                  data.map((item, index) => {
                    const {
                      productTitle,
                      productThumbnail,
                      productCategory,
                      productUserUID,
                      documentID,
                    } = item;

                    if (userID === productUserUID) {
                      return (
                        <Row className="mb-5" key={documentID}>
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
                                <Row>
                                  <Link to={`/store/${documentID}`}>
                                    <h4 id="donate-product-header">
                                      {productTitle}
                                    </h4>
                                  </Link>
                                  <p id="donate-product-id">
                                    ID:&ensp;{documentID}
                                  </p>
                                </Row>
                                <Row>
                                  <p>{productCategory}</p>
                                </Row>
                                <Row className="text-center">
                                  <Col>
                                    <Button
                                      id="donate-unlist"
                                      onClick={() =>
                                        dispatch(deleteProductStart(documentID))
                                      }
                                    >
                                      <TiCancel id="donate-icons" />
                                      &ensp;Unlist donation
                                    </Button>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </Container>
                        </Row>
                      );
                    }
                  })}
              </Row>
            </Container>
          </Col>
          <Col sm="2"></Col>
        </Row>
      </Container>
    </>
  );
};

export default Donate;
