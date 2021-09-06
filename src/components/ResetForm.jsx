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
      <Form className="reset-form" onSubmit={handleSubmit}>
        <Container className="justify-content-center">
          <Row>
            <h1 className="reset-header">Forgot password</h1>
          </Row>
          <br />
          <Row>
            <p>
              Enter the email associated with your Givemore account and we will
              send an email with instructions to reset your password.
            </p>
          </Row>
          <br />

          <div className="text-center ">
            <Form.Group as={Row} className="mb-5">
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

            <Button className="reset-button" type="submit" variant="primary">
              Send recovery email
            </Button>

            <br />
            <br />
            {errors.length > 0 && (
              <>
                <div className="reset-errors">
                  {errors.map((err, index) => {
                    return <li key={index}>{err}</li>;
                  })}
                </div>
                <br />
              </>
            )}
          </div>
        </Container>
      </Form>
    </>
  );
};

export default ResetForm;
