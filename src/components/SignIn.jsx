//components
import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

//redux stuff
import { useDispatch, useSelector } from "react-redux";
import { emailSignInStart, googleSignInStart } from "../redux/user.action";

//stylesheets
import "./signin-styles.scss";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const SignIn = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { currentUser } = useSelector(mapState);
  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    if (currentUser) {
      setEmail("");
      setPassword("");
      history.push("/");
    }
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(emailSignInStart({ email, password }));
  };

  const handleGoogleSignIn = (e) => {
    dispatch(googleSignInStart());
  };

  return (
    <>
      <Container>
        <Row>
          <Col className="d-flex justify-content-center">
            <Form className="form" onSubmit={handleSubmit}>
              <h3 className="text-center">Sign-In</h3>
              <br />
              <div className="text-center ">
                <Button
                  type="submit"
                  variant="primary"
                  onClick={handleGoogleSignIn}
                >
                  Sign-in with Google
                </Button>
                <br />
                or
              </div>

              <br />

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="4">
                  Email
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    name="email"
                    value={email}
                    type="email"
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="4">
                  Password
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    name="password"
                    value={password}
                    type="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <div className="text-center ">
                <Button type="submit" variant="primary">
                  Sign-in
                </Button>
              </div>
              <br />
              <Link to="/reset">Reset Password</Link>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SignIn;
