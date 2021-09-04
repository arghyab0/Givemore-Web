//components
import { Navbar, Container, Nav, Form, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";

//redux stuff
import { useSelector, useDispatch } from "react-redux";
import { signOutUserStart } from "../redux/user.action";
import { selectCartItemsCount } from "../redux/cart.selectors";

//stylesheet
import "./header-styles.scss";

const mapState = (state) => ({
  currentUser: state.user.currentUser,
  cartItemsNum: selectCartItemsCount(state),
});

const Header = (props) => {
  const { currentUser, cartItemsNum } = useSelector(mapState);
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(signOutUserStart());
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="light"
        variant="light"
        sticky="top"
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
                  <Link to="/donate">Donate</Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/store">Store</Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/dashboard">My Account</Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/cart">Cart ({cartItemsNum})</Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/" onClick={() => signOut()}>
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
