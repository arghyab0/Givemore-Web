//components
import { Navbar, Container, Nav, Form, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

//utils
import { auth } from "../firebase/utils";

//stylesheet
import "./header-styles.scss";

const Header = (props) => {
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="light"
        variant="light"
        className="navbar"
      >
        <Container>
          <Navbar.Brand>
            <Link to="/">Givemore</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Form className="d-flex">
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="mr-2"
                  aria-label="Search"
                />
              </Form>
            </Nav>

            {props.currentUser && (
              <Nav>
                <Nav.Link>
                  <Link to="/dashboard">My Account</Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/" onClick={() => auth.signOut()}>
                    Logout
                  </Link>
                </Nav.Link>
              </Nav>
            )}

            {!props.currentUser && (
              <Nav>
                <Nav.Link>
                  <Link to="/register">Register</Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/login">Login</Link>
                </Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps, null)(Header);
