import { combineReducers } from "redux";

//reducers
import userReducer from "./user.reducer";
import productsReducer from "./product.reducer";
import cartReducer from "./cart.reducer";

export default combineReducers({
  user: userReducer,
  productsData: productsReducer,
  cartData: cartReducer,
});
