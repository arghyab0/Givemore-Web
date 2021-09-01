//components
import { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { withRouter } from "react-router";

//utils
import { auth } from "../firebase/utils";

//stylesheets
import "./resetform-styles.scss";

const ResetForm = (props) => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        url: "http://localhost:3000/login",
      };
      await auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
          props.history.push("/login");
        })
        .catch(() => {
          const err = "Email not found";
          setErrors(err);
        });
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <>
      <Container>
        <Row>
          <Col className="d-flex justify-content-center">
            <Form className="form" onSubmit={handleSubmit}>
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
                    onChange={(e) => setEmail(e.target.value)}
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
};

export default withRouter(ResetForm);
