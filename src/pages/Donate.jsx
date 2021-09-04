//components
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import AddModal from "../components/AddModal";
import LoadMore from "../components/LoadMore";

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
  const { data, queryDoc, isLastPage } = products;
  const { displayName } = currentUser;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductsStart());
  }, []);

  const handleLoadMore = () => {
    dispatch(
      fetchProductsStart({ startAfterDoc: queryDoc, persistProducts: data })
    );
  };

  return (
    <>
      <h2>Hello, {displayName}</h2>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Add new donation
      </Button>

      <AddModal show={modalShow} onHide={() => setModalShow(false)} />

      <ul>
        {Array.isArray(data) &&
          data.length > 0 &&
          data.map((item, index) => {
            const {
              productTitle,
              productThumbnail,
              productDesc,
              productCategory,
              documentID,
            } = item;

            return (
              <li key={documentID}>
                {productTitle} {productThumbnail} {productDesc}{" "}
                {productCategory}
                <Button
                  onClick={() => dispatch(deleteProductStart(documentID))}
                >
                  Delete
                </Button>
                <br />
                <br />
              </li>
            );
          })}
      </ul>
      {!isLastPage && <LoadMore onLoadMore={handleLoadMore} />}
    </>
  );
};

export default Donate;
