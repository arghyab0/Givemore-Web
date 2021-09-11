//components
import { useState, useEffect } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import Footer from "../components/Footer";

//stylesheets
import "./home-styles.scss";

//assets
import Landing from "./../assets/landing-image.svg";

const Home = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => {
        const ismobile = window.innerWidth < 800;
        if (ismobile !== isMobile) setIsMobile(ismobile);
      },
      false
    );
  }, [isMobile]);

  const mobileClass = isMobile ? "text-center" : "";

  return (
    <>
      <Container>
        <Row className="align-items-center" style={{ height: "92vh" }}>
          <Col sm="7">
            <h1 className="landing-text mb-5">
              Givemore is a donation-based community marketplace for essentials
              supplies
            </h1>
            <div className={`${mobileClass}`}>
              <Button id="join-btn" href="/register">
                Join Givemore!
              </Button>
              &ensp; &ensp;
              <Button id="listing-btn" href="/store">
                Browse listings
              </Button>
            </div>
          </Col>
          <Col sm="5">
            <img
              src={Landing}
              alt="Illustration of a community"
              className="home-img"
            />
          </Col>
        </Row>
      </Container>

      <div id="banner">
        <Container style={{ color: "#fff" }}>
          <Row className={`align-items-center ${mobileClass}`}>
            <Col sm="5" className="text-center">
              <h1 style={{ fontWeight: "700" }} className="mb-5">
                Why Givemore?
              </h1>
            </Col>
            <Col sm="7">
              <p style={{ fontSize: "16px" }}>
                The impact of COVID-19 pandemic has been largely disruptive to
                the local supply of food, equipment, medical supplies and other
                resources. Our goal is to build a platform that serves as the
                basis to ensure community cooperation that addresses this issue.
              </p>
              <p style={{ fontSize: "16px" }}>
                Givemore enables donors(such as a store or a community member
                who has produce they can distribute) to make people aware of
                what they have in surplus and donees (financially
                underprivileged individuals, medical workers, NGOs or hospitals)
                to request these supplies from the donors.
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      <Container style={{ padding: "8vh 0" }}>
        <Row className={`align-items-center ${mobileClass}`}>
          <Col sm="6" className="text-center">
            <h1 style={{ fontWeight: "700" }} className="mb-5">
              How does Givemore work?
            </h1>
          </Col>
          <Col sm="6">
            <ol>
              <li>List your surplus supplies for donation</li>
              <li>Approve one of the many requests you get</li>
              <li>
                The supplies undergo basic quality check and sanitization in our
                collection units
              </li>
              <li>The supplies are delivered to the donees' doorstep</li>
            </ol>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Home;
