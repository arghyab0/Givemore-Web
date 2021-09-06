//components
import { Row, Col, Container } from "react-bootstrap";
import ProductsColl from "../components/ProductsColl";

//stylesheet
import "./store-styles.scss";

const Store = () => {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <ProductsColl />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Store;
