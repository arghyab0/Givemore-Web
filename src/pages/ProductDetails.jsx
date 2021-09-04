//components
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router";

//redux stuff
import { useSelector, useDispatch } from "react-redux";
import { fetchProductStart, setProduct } from "../redux/product.action";

//stylesheets
import "./productdetails-styles.scss";

const mapState = (state) => ({
  product: state.productsData.product,
});

const ProductDetails = () => {
  const { product } = useSelector(mapState);
  const {
    productTitle,
    productThumbnail,
    productDesc,
    productCategory,
    documentID,
  } = product;

  const dispatch = useDispatch();
  const { productID } = useParams();

  useEffect(() => {
    dispatch(fetchProductStart(productID));

    return () => {
      dispatch(setProduct({}));
    };
  }, []);

  return (
    <>
      <img src={productThumbnail} alt="product" />
      <h2>{productTitle}</h2>
      <h3>{productDesc}</h3>
      <h3>{productCategory}</h3>
      <p>{productID}</p>
      <Button variant="primary">Add to Cart</Button>
    </>
  );
};

export default ProductDetails;
