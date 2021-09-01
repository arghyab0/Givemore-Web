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

  render() {
    const { displayName, email, password, confirmPassword } = this.state;

    return (
      <>
        <Container>
          <Row>
            <Col className="d-flex justify-content-center">
              <Form className="signup-form">
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
                      placeholder="Name"
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
                      placeholder="Password"
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
                      placeholder="Confirm Password"
                      onChange={this.handleChange}
                    />
                  </Col>
                </Form.Group>

                <div className="text-center">
                  <Button variant="primary">Sign-up with email</Button>{" "}
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
