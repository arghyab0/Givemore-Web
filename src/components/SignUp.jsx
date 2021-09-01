//components
import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

//utils
import { auth, handleUserProfile } from "../firebase/utils";

//stylesheets
import "./signup-styles.scss";

const SignUp = (props) => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState("");

  const handleFormSubit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      const err = ["Passwords don't match"];
      setErrors(err);
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await handleUserProfile(user, { displayName });

      setDisplayName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Container>
        <Row>
          <Col className="d-flex justify-content-center">
            <Form className="form" onSubmit={handleFormSubit}>
              <h3 className="text-center">Sign-Up</h3>
              <br />

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="4">
                  Name
                </Form.Label>
                <Col sm="8">
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

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="4">
                  Confirm Password
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    name="confirmPassword"
                    value={confirmPassword}
                    type="password"
                    placeholder="confirm password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Col>
              </Form.Group>

              {errors.length > 0 && (
                <ul>
                  {errors.map((err, index) => {
                    return <li key={index}>{err}</li>;
                  })}
                </ul>
              )}

              <div className="text-center">
                <Button type="submit" variant="primary">
                  Sign-up with email
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SignUp;
