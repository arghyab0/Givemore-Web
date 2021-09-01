//components
import { Navbar, Container } from "react-bootstrap";

//stylesheet
import "./footer-styles.scss";

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
