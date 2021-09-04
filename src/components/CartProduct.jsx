//components
import { Button } from "react-bootstrap";

//redux stuff
import { useDispatch } from "react-redux";
import {
  removeCartItem,
  addProduct,
  reduceCartItem,
} from "../redux/cart.action";

//stylesheets
import "./cartproduct-styles.scss";

const CartProduct = (product) => {
  const dispatch = useDispatch();

  const handleRemoveCartItem = (documentID) => {
    dispatch(removeCartItem({ documentID }));
  };

  const handleAddProduct = (product) => {
    dispatch(addProduct(product));
  };

  const handleReduceProduct = (product) => {
    dispatch(reduceCartItem(product));
  };

  const {
    productTitle,
    productThumbnail,
    productDesc,
    productCategory,
    quantity,
    documentID,
  } = product;

  return (
    <>
      <p>
        {productTitle}-------
        {quantity}--------
        <Button onClick={() => handleReduceProduct(product)}> {`<`} </Button>
        <Button onClick={() => handleAddProduct(product)}> {`>`} </Button>
        <Button onClick={() => handleRemoveCartItem(documentID)}> X </Button>
      </p>
    </>
  );
};

export default CartProduct;
