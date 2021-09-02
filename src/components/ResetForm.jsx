//components
import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useHistory } from "react-router";

//redux stuff
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordStart, resetUserState } from "../redux/user.action";

//stylesheets
import "./resetform-styles.scss";

const mapState = ({ user }) => ({
  resetPasswordSuccess: user.resetPasswordSuccess,
  userErr: user.userErr,
});

const ResetForm = (props) => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState("");

  const { resetPasswordSuccess, userErr } = useSelector(mapState);
  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    if (resetPasswordSuccess) {
      dispatch(resetUserState());
      history.push("/");
    }
  }, [resetPasswordSuccess]);

  useEffect(() => {
    if (Array.isArray(userErr) && userErr.length > 0) {
      setErrors(userErr);
    }
  }, [userErr]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPasswordStart({ email }));
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

export default ResetForm;
