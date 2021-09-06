//components
import { Row, Col, Container } from "react-bootstrap";
import SignUp from "../components/SignUp";

//stylesheet
import "./register-styles.scss";

const Register = () => {
  return (
    <>
      <Container>
        <Row>
          <Col sm="3"></Col>
          <Col sm="6">
            <SignUp />
          </Col>
          <Col sm="3"></Col>
        </Row>
      </Container>
    </>
  );
};

export default Register;
