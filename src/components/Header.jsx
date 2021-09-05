//components
import { Navbar, Container, Nav } from "react-bootstrap";

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
        expand="md"
        bg="light"
        variant="light"
        sticky="top"
        className="navbar py-3"
      >
        <Container>
          <Navbar.Brand href="/">Givemore</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>

            {currentUser && (
              <Nav>
                <Nav.Link className="header-link" href="/donate">
                  Donate
                </Nav.Link>
                <Nav.Link className="header-link" href="/store">
                  Store
                </Nav.Link>
                <Nav.Link className="header-link" href="/cart">
                  {" "}
                  Cart ({cartItemsNum})
                </Nav.Link>
                <Nav.Link
                  className="header-link"
                  href="/"
                  onClick={() => signOut()}
                >
                  Logout
                </Nav.Link>
              </Nav>
            )}

            {!currentUser && (
              <Nav>
                <Nav.Link className="header-link" href="/register">
                  Register
                </Nav.Link>
                <Nav.Link className="header-link" href="/login">
                  Login
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
