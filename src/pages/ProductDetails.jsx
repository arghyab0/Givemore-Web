//components
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useParams, useHistory } from "react-router";

//redux stuff
import { useSelector, useDispatch } from "react-redux";
import { fetchProductStart, setProduct } from "../redux/product.action";
import { addProduct } from "../redux/cart.action";

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
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchProductStart(productID));

    return () => {
      dispatch(setProduct({}));
    };
  }, []);

  const handleAddToCart = (product) => {
    if (!product) return;
    dispatch(addProduct(product));
    history.push("/cart");
  };

  return (
    <>
      <img src={productThumbnail} alt="product" />
      <h2>{productTitle}</h2>
      <h3>{productDesc}</h3>
      <h3>{productCategory}</h3>
      <p>{productID}</p>
      <Button variant="primary" onClick={() => handleAddToCart(product)}>
        Add to Cart
      </Button>
    </>
  );
};

export default ProductDetails;
