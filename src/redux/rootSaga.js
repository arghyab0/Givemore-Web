//effects
import { all, call } from "redux-saga/effects";

//sagas
import userSagas from "./user.sagas";

export default function* rootSaga() {
  yield all([call(userSagas)]);
}
