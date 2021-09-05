//stylesheets
import { Col, Container, Row } from "react-bootstrap";
import "./home-styles.scss";

const Home = () => {
  return (
    <>
      <Container bsClass=".home-page">
        <Row>
          <Col>
            <h1>Homepage</h1>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
