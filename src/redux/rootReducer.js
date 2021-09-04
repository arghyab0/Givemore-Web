import { combineReducers } from "redux";

//reducers
import userReducer from "./user.reducer";
import productsReducer from "./product.reducer";
import cartReducer from "./cart.reducer";

//to persist data in local storage
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const rootReducer = combineReducers({
  user: userReducer,
  productsData: productsReducer,
  cartData: cartReducer,
});

const configStorage = {
  key: "root",
  storage,
  whitelist: ["cartData"],
};

export default persistReducer(configStorage, rootReducer);
