//components
import React, { Component } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

//utils
import { auth, handleUserProfile } from "../firebase/utils";

//stylesheets
import "./signup-styles.scss";

const initialState = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
  errors: [],
};

export class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...initialState,
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleFormSubit = async (e) => {
    e.preventDefault();
    const { displayName, email, password, confirmPassword, errors } =
      this.state;
    if (password !== confirmPassword) {
      const err = ["Passwords don't match"];
      this.setState({ errors: err });
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await handleUserProfile(user, { displayName });
      this.setState({
        ...initialState,
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { displayName, email, password, confirmPassword, errors } =
      this.state;

    return (
      <>
        <Container>
          <Row>
            <Col className="d-flex justify-content-center">
              <Form className="form" onSubmit={this.handleFormSubit}>
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
                      onChange={this.handleChange}
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
                      onChange={this.handleChange}
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
                      onChange={this.handleChange}
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
                      onChange={this.handleChange}
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
  }
}

export default SignUp;
