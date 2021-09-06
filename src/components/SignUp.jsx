//components
import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

//redux stuff
import { useDispatch, useSelector } from "react-redux";
import { signUpUserStart } from "../redux/user.action";

//stylesheets
import "./signup-styles.scss";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  userErr: user.userErr,
});

const SignUp = (props) => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState("");

  const { currentUser, userErr } = useSelector(mapState);
  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    if (currentUser) {
      setDisplayName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setErrors([]);
      history.push("/");
    }
  }, [currentUser]);

  useEffect(() => {
    if (Array.isArray(userErr) && userErr.length > 0) {
      setErrors(userErr);
    }
  }, [userErr]);

  const handleFormSubit = (e) => {
    e.preventDefault();
    dispatch(
      signUpUserStart({ displayName, email, password, confirmPassword })
    );
  };

  return (
    <>
      <Form className="signup-form" onSubmit={handleFormSubit}>
        <Container className="justify-content-center">
          <Row>
            <h1 className="signup-header">Join Givemore today</h1>
          </Row>
          <br />
          <br />
          <div className="text-center ">
            <Form.Group as={Row} className="mb-3">
              <Form.Label column xs="4">
                Name
              </Form.Label>
              <Col xs="8">
                <Form.Control
                  name="displayName"
                  value={displayName}
                  type="text"
                  placeholder="name"
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </Col>
            </Form.Group>

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

            <Form.Group as={Row} className="mb-3">
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

            <Form.Group as={Row} className="mb-5">
              <Form.Label column xs="4">
                Confirm Password
              </Form.Label>
              <Col xs="8">
                <Form.Control
                  name="confirmPassword"
                  value={confirmPassword}
                  type="password"
                  placeholder="re-type password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Button className="email-signup" type="submit" variant="primary">
              Sign up with email
            </Button>

            <br />
            <br />
            {errors.length > 0 && (
              <>
                <div className="signup-errors">
                  {errors.map((err, index) => {
                    return <li key={index}>{err}</li>;
                  })}
                </div>
                <br />
              </>
            )}
          </div>

          <Row>
            <Link to="/login"> Already have an account? </Link>
          </Row>
        </Container>
      </Form>
    </>
  );
};

export default SignUp;
