//components
import { useState } from "react";
import {
  Row,
  Col,
  Modal,
  Button,
  Form,
  InputGroup,
  Dropdown,
  DropdownButton,
  FormControl,
} from "react-bootstrap";

//redux stuff
import { useDispatch } from "react-redux";
import { addNewProductStart } from "../redux/product.action";

//stylesheets
import "./addmodal-styles.scss";

const AddModal = (props) => {
  const [productTitle, setProductTitle] = useState("");
  const [productThumbnail, setProductThumbnail] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productCategory, setProductCategory] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setProductTitle("");
    setProductThumbnail("");
    setProductDesc("");
    setProductCategory("");
    dispatch(
      addNewProductStart({
        productTitle,
        productThumbnail,
        productDesc,
        productCategory,
      })
    );
  };

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add new product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-2">
              <Col sm="2"></Col>
              <Form.Label column sm="2">
                Product title
              </Form.Label>
              <Col sm="6">
                <Form.Control
                  name="productTitle"
                  value={productTitle}
                  type="text"
                  placeholder="title"
                  onChange={(e) => setProductTitle(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-2">
              <Col sm="2"></Col>
              <Form.Label column sm="2">
                Product image URL
              </Form.Label>
              <Col sm="6">
                <Form.Control
                  name="productThumbnail"
                  value={productThumbnail}
                  type="text"
                  placeholder="image URL"
                  onChange={(e) => setProductThumbnail(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-2">
              <Col sm="2"></Col>
              <Form.Label column sm="2">
                Product description
              </Form.Label>
              <Col sm="6">
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="productDesc"
                  value={productDesc}
                  type="text"
                  placeholder="description"
                  onChange={(e) => setProductDesc(e.target.value)}
                />
              </Col>
            </Form.Group>

            <InputGroup as={Row} className="mb-2">
              <Col sm="3"></Col>
              <Col sm="2">
                <DropdownButton
                  variant="outline-secondary"
                  title="Category"
                  id="input-group-dropdown-1"
                >
                  <Dropdown.Item
                    as="option"
                    value="cat1"
                    onClick={(e) => setProductCategory(e.target.value)}
                  >
                    Cat1
                  </Dropdown.Item>
                  <Dropdown.Item
                    as="option"
                    value="cat2"
                    onClick={(e) => setProductCategory(e.target.value)}
                  >
                    Cat2
                  </Dropdown.Item>
                  <Dropdown.Item
                    as="option"
                    value="cat3"
                    onClick={(e) => setProductCategory(e.target.value)}
                  >
                    Cat3
                  </Dropdown.Item>
                </DropdownButton>
              </Col>
              <Col sm="4">
                <FormControl value={productCategory} readOnly />
              </Col>
            </InputGroup>

            <div className="text-center">
              <Button type="submit" onClick={props.onHide} variant="primary">
                List new product
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddModal;
