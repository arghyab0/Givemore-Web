//components
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import AddModal from "../components/AddModal";

//redux stuff
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProductsStart,
  deleteProductStart,
} from "../redux/product.action";

//stylesheets
import "./donate-styles.scss";

const mapState = ({ user, productsData }) => ({
  currentUser: user.currentUser,
  products: productsData.products,
});

const Donate = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const { currentUser, products } = useSelector(mapState);
  const { displayName } = currentUser;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductsStart());
  }, []);

  return (
    <>
      <h2>Hello, {displayName}</h2>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Add new donation
      </Button>

      <AddModal show={modalShow} onHide={() => setModalShow(false)} />

      <ul>
        {products.map((item, index) => {
          const {
            productTitle,
            productThumbnail,
            productDesc,
            productCategory,
            documentID,
          } = item;

          return (
            <li key={documentID}>
              {productTitle} {productThumbnail} {productDesc} {productCategory}
              <Button onClick={() => dispatch(deleteProductStart(documentID))}>
                Delete
              </Button>
              <br />
              <br />
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Donate;
