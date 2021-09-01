import { createStore, applyMiddleware } from "redux";

import rootReducer from "./rootReducer";

export const middlewares = [];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
