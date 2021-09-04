import { combineReducers } from "redux";

//reducers
import userReducer from "./user.reducer";
import productsReducer from "./product.reducer";

export default combineReducers({
  user: userReducer,
  productsData: productsReducer,
});
