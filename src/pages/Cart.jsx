//components
import Checkout from "../components/Checkout";

//stylesheets
import "./cart-styles.scss";

import React from "react";

const Cart = () => {
  return (
    <>
      <h2>My cart</h2>
      <Checkout />
    </>
  );
};

export default Cart;
