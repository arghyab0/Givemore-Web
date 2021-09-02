import { createStore, applyMiddleware } from "redux";

//middlewares
import thunk from "redux-thunk";

import rootReducer from "./rootReducer";

export const middlewares = [thunk];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
