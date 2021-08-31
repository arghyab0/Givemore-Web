//stylesheet
import "./footer-styles.scss";

//
import { Navbar, Container } from "react-bootstrap";

const Footer = () => {
  return (
    <>
      <Navbar fixed="bottom" bg="light" className="footer">
        <Container>
          <Navbar.Text>Copyright info blah blah</Navbar.Text>
        </Container>
      </Navbar>
    </>
  );
};

export default Footer;
