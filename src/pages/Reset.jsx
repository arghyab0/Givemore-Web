//components
import { Row, Col, Container } from "react-bootstrap";
import ResetForm from "../components/ResetForm";

//stylesheets
import "./reset-styles.scss";

const Reset = () => {
  return (
    <>
      <Container>
        <Row>
          <Col sm="3"></Col>
          <Col sm="6">
            <ResetForm />
          </Col>
          <Col sm="3"></Col>
        </Row>
      </Container>
    </>
  );
};

export default Reset;
