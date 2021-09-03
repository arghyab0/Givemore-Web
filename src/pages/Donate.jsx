//components
import { useState } from "react";
import { Button } from "react-bootstrap";
import AddModal from "../components/AddModal";

//redux stuff
import { useSelector } from "react-redux";

//stylesheets
import "./donate-styles.scss";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const Donate = () => {
  const [modalShow, setModalShow] = useState(false);
  const { currentUser } = useSelector(mapState);
  const { displayName } = currentUser;

  return (
    <>
      <h2>Hello, {displayName}</h2>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Add new donation
      </Button>

      <AddModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
};

export default Donate;
