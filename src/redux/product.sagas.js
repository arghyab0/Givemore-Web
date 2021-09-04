//saga effects
import { takeLatest, call, all, put } from "redux-saga/effects";

//redux stuff
import productTypes from "./product.types";
import { setProducts, fetchProductsStart } from "./product.action";

//firebase utils
import { auth } from "../firebase/utils";

//helper utils
import {
  handleAddNewProduct,
  handleFetchProducts,
  handleDeleteProduct,
} from "./product.helpers";

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

    yield put(fetchProductsStart());
  } catch (err) {
    // console.log(err);
  }
}

export function* onAddNewProductStart() {
  yield takeLatest(productTypes.ADD_NEW_PRODUCT_START, addNewProduct);
}

export function* fetchProducts({ payload: { filterType } }) {
  try {
    const products = yield handleFetchProducts({ filterType });
    yield put(setProducts(products));
  } catch (err) {
    console.log(err);
  }
}

export function* onFetchProductsStart() {
  yield takeLatest(productTypes.FETCH_PRODUCTS_START, fetchProducts);
}

export function* deleteProduct({ payload }) {
  try {
    yield handleDeleteProduct(payload);
    yield put(fetchProductsStart());
  } catch (err) {
    console.log(err);
  }
}

export function* onDeleteProductStart() {
  yield takeLatest(productTypes.DELETE_PRODUCT_START, deleteProduct);
}

export default function* productSagas() {
  yield all([
    call(onAddNewProductStart),
    call(onFetchProductsStart),
    call(onDeleteProductStart),
  ]);
}
