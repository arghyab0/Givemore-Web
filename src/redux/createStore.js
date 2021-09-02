import { createStore, applyMiddleware } from "redux";

//middlewares
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";

//
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();
export const middlewares = [thunk, sagaMiddleware];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
sagaMiddleware.run(rootSaga);

export default store;
