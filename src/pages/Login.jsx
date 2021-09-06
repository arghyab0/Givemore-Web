//components
import { Row, Col, Container } from "react-bootstrap";
import SignIn from "../components/SignIn";

//stylesheets
import "./login-styles.scss";

const Login = () => {
  return (
    <>
      <Container>
        <Row>
          <Col sm="3"></Col>
          <Col sm="6">
            <SignIn />
          </Col>
          <Col sm="3"></Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
