//components
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import CartProduct from "./CartProduct";

//redux stuff
import { useSelector } from "react-redux";
import { selectCartItems } from "../redux/cart.selectors";
import { createStructuredSelector } from "reselect";

//stylesheets
import "./checkout-styles.scss";

const mapState = createStructuredSelector({
  cartItems: selectCartItems,
});

const Checkout = () => {
  const { cartItems } = useSelector(mapState);

  return (
    <>
      <h2>Checkout</h2>

      {cartItems.length > 0 ? (
        <>
          {cartItems.map((item, index) => {
            return <CartProduct {...item} key={item.documentID} />;
          })}

          <Link to="/store">
            <Button>Continue browsing</Button>
          </Link>
          <Link to="/shipping">
            <Button>Checkout</Button>
          </Link>
        </>
      ) : (
        <p>No items in cart</p>
      )}
    </>
  );
};

export default Checkout;
