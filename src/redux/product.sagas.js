//saga effects
import { takeLatest, call, all, put } from "redux-saga/effects";

//redux stuff
import productTypes from "./product.types";

//firebase utils
import { auth } from "../firebase/utils";

//helper utils
import { handleAddNewProduct } from "./product.helpers";

export function* addNewProduct({
  payload: { productTitle, productThumbnail, productDesc, productCategory },
}) {
  try {
    const timestamp = new Date();

    yield handleAddNewProduct({
      productTitle,
      productThumbnail,
      productDesc,
      productCategory,
      productUserUID: auth.currentUser.uid,
      createdDate: timestamp,
    });
  } catch (err) {
    // console.log(err);
  }
}

export function* onAddNewProductStart() {
  yield takeLatest(productTypes.ADD_NEW_PRODUCT_START, addNewProduct);
}

export default function* productSagas() {
  yield all([call(onAddNewProductStart)]);
}
