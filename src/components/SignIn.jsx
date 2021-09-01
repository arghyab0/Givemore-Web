//components
import React, { Component } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { signInWithGoogle, auth } from "../firebase/utils";

//stylesheets
import "./signin-styles.scss";

const initialState = {
  email: "",
  password: "",
};

export class SignIn extends Component {
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

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({
        ...initialState,
      });
    } catch (err) {
      // console.log(err);
    }
  };

  render() {
    const { email, password } = this.state;

    return (
      <>
        <Container>
          <Row>
            <Col className="d-flex justify-content-center">
              <Form className="signin-form" onSubmit={this.handleSubmit}>
                <h3 className="text-center">Sign-In</h3>
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

                <div className="text-center ">
                  <Button type="submit" variant="primary">
                    Sign-in
                  </Button>
                  <br />
                  or
                  <br />
                  <Button
                    type="submit"
                    variant="primary"
                    onClick={signInWithGoogle}
                  >
                    Sign-in with Google
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

export default SignIn;
