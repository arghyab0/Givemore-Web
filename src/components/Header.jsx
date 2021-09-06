//components
import { Navbar, Container, Nav } from "react-bootstrap";

//redux stuff
import { useSelector, useDispatch } from "react-redux";
import { signOutUserStart } from "../redux/user.action";
import { selectCartItemsCount } from "../redux/cart.selectors";

//stylesheet
import "./header-styles.scss";
import {
  BiDonateHeart,
  BiStore,
  BiCartAlt,
  BiLogOut,
  BiLogIn,
} from "react-icons/bi";
import { IoIosArrowDropdown } from "react-icons/io";

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
        className="navbar py-3"
        expand="md"
        bg="light"
        variant="light"
        sticky="top"
      >
        <Container>
          <Navbar.Brand href="/">Givemore</Navbar.Brand>

          {currentUser && (
            <>
              <Navbar.Toggle
                className="nav-dropdown"
                aria-controls="responsive-navbar-nav"
              >
                <IoIosArrowDropdown className="nav-icons" />
              </Navbar.Toggle>
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto"></Nav>

                <Nav>
                  <Nav.Link className="nav-link" href="/donate">
                    <BiDonateHeart className="nav-icons" /> Donate
                  </Nav.Link>
                  <Nav.Link className="nav-link" href="/store">
                    <BiStore className="nav-icons" /> Store
                  </Nav.Link>
                  <Nav.Link className="nav-link" href="/cart">
                    <BiCartAlt className="nav-icons" /> Cart ({cartItemsNum})
                  </Nav.Link>
                  <Nav.Link
                    className="nav-link"
                    href="/"
                    onClick={() => signOut()}
                  >
                    <BiLogOut className="nav-icons" /> Logout
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </>
          )}

          {!currentUser && (
            <Nav>
              <Nav.Link className="nav-link" href="/login">
                <BiLogIn className="nav-icons" /> Login
              </Nav.Link>
            </Nav>
          )}
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
