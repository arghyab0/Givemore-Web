//components
import { Card, Button } from "react-bootstrap";

//redux stuff

//stylesheet
import "./product-styles.scss";

const Product = ({
  productTitle,
  productThumbnail,
  productDesc,
  productCategory,
  documentID,
}) => {
  if (!productTitle || !productThumbnail || !productCategory) return null;

  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={productThumbnail} alt={productTitle} />
        <Card.Body>
          <Card.Title>{productTitle}</Card.Title>
          <Card.Text>
            {productDesc} <br />
            {productCategory}
          </Card.Text>
          <Button variant="primary">Add to Cart</Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default Product;
