//components
import React, { Component } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { withRouter } from "react-router";

//utils
import { auth } from "../firebase/utils";

//stylesheets
import "./resetform-styles.scss";

const initialState = {
  email: "",
  errors: [],
};

export class ResetForm extends Component {
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

    try {
      const { email } = this.state;
      const config = {
        url: "http://localhost:3000/login",
      };
      await auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
          this.props.history.push("/login");
        })
        .catch(() => {
          const err = "Email not found";
          this.setState({
            errors: err,
          });
        });
    } catch (err) {
      // console.log(err);
    }
  };

  render() {
    const { email, errors } = this.state;
    return (
      <>
        <Container>
          <Row>
            <Col className="d-flex justify-content-center">
              <Form className="form" onSubmit={this.handleSubmit}>
                <h3 className="text-center">Forgot Password</h3>
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

                {errors.length > 0 && (
                  <ul>
                    {errors.map((err, index) => {
                      return <li key={index}>{err}</li>;
                    })}
                  </ul>
                )}

                <div className="text-center ">
                  <Button type="submit" variant="primary">
                    Send recovery email
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

export default withRouter(ResetForm);
