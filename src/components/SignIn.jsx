//components
import React, { Component } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { signInWithGoogle } from "../firebase/utils";

//stylesheets
import "./signin-styles.scss";

export class SignIn extends Component {
  handleSubmit = async (e) => {
    e.preventDefault();
  };

  render() {
    return (
      <>
        <Container>
          <Row>
            <Col className="d-flex justify-content-center">
              <Form className="signin-form" onSubmit={this.handleSubmit}>
                <h3 className="text-center">Sign-In</h3>
                <br />
                <Button
                  className="google-signin"
                  variant="primary"
                  onClick={signInWithGoogle}
                >
                  Sign-in with Google
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default SignIn;
