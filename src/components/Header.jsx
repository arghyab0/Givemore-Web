//components
import { Navbar, Container, Nav, Form, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";

//redux stuff
import { useSelector } from "react-redux";

//utils
import { auth } from "../firebase/utils";

//stylesheet
import "./header-styles.scss";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const Header = (props) => {
  const { currentUser } = useSelector(mapState);

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

            {currentUser && (
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

            {!currentUser && (
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

export default Header;
