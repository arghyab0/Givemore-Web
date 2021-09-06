//components
import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

//redux stuff
import { useDispatch, useSelector } from "react-redux";
import { emailSignInStart, googleSignInStart } from "../redux/user.action";

//stylesheets
import "./signin-styles.scss";
import { FcGoogle } from "react-icons/fc";

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
      <Form className="signin-form " onSubmit={handleSubmit}>
        <Container className="justify-content-center">
          <Row>
            <h1 className="signin-header">Welcome back!</h1>
          </Row>
          <Row>
            <p>We are so excited to see you again!</p>
          </Row>
          <br />
          <div className="text-center ">
            <Button
              className="google-signin"
              variant="primary"
              onClick={handleGoogleSignIn}
            >
              <FcGoogle /> &ensp; Sign in with Google
            </Button>
            <br />
            <br />
            or
            <br />
            <br />
            <Form.Group as={Row} className="mb-3">
              <Form.Label column xs="4">
                Email
              </Form.Label>
              <Col xs="8">
                <Form.Control
                  name="email"
                  value={email}
                  type="email"
                  placeholder="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-1">
              <Form.Label column xs="4">
                Password
              </Form.Label>
              <Col xs="8">
                <Form.Control
                  name="password"
                  value={password}
                  type="password"
                  placeholder="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Link id="signin-reset" to="/reset">
              Forgot Password?
            </Link>
            <br />
            <br />
            <Button className="email-signin" type="submit" variant="primary">
              Login
            </Button>
          </div>
          <br />
          <Row style={{ display: "inline", color: "rgb(0,0,0, 0.7)" }}>
            Need an account?<Link to="/register">Register</Link>
          </Row>
        </Container>
      </Form>
    </>
  );
};

export default SignIn;
