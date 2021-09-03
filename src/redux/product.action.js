import productTypes from "./product.types";

export const addNewProductStart = (productData) => ({
  type: productTypes.ADD_NEW_PRODUCT_START,
  payload: productData,
});
