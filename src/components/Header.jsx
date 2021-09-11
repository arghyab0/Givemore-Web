//components
import { Navbar, Container, Nav } from "react-bootstrap";

//redux stuff
import { useSelector, useDispatch } from "react-redux";
import { signOutUserStart } from "../redux/user.action";
import { selectCartItemsCount } from "../redux/cart.selectors";

//stylesheet
import "./header-styles.scss";

//assets
import {
  BiDonateHeart,
  BiStore,
  BiCartAlt,
  BiLogOut,
  BiLogIn,
} from "react-icons/bi";
import { IoIosArrowDropdown } from "react-icons/io";
import Logo from "./../assets/brand-logo.png";

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
        id="navbar"
        className="py-3"
        expand="md"
        sticky="top"
      >
        <Container>
          <Navbar.Brand href="/">
            <img
              alt="brand logo"
              src={Logo}
              width="40px"
              height="40px"
              className="d-inline-block align-top"
              style={{ margin: "-6px 6px" }}
            />
          </Navbar.Brand>

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
                  <Nav.Link id="nav-link" href="/donate">
                    <BiDonateHeart className="nav-icons" /> Donate
                  </Nav.Link>
                  <Nav.Link id="nav-link" href="/store">
                    <BiStore className="nav-icons" /> Store
                  </Nav.Link>
                  <Nav.Link id="nav-link" href="/cart">
                    <BiCartAlt className="nav-icons" /> Cart ({cartItemsNum})
                  </Nav.Link>
                  <Nav.Link id="nav-link" href="/" onClick={() => signOut()}>
                    <BiLogOut className="nav-icons" /> Logout
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </>
          )}

          {!currentUser && (
            <Nav>
              <Nav.Link id="nav-link" className="nav-link-login " href="/login">
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
