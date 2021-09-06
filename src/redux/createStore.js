import { createStore, applyMiddleware } from "redux";

//middlewares
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";

//root stuff
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

//persist stuff
import { persistStore } from "redux-persist";

import { composeWithDevTools } from "redux-devtools-extension";

const sagaMiddleware = createSagaMiddleware();
export const middlewares = [thunk, sagaMiddleware];

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export default { store, persistor };
