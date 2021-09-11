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
      <Modal {...props} size="lg" centered>
        <Modal.Header style={{ border: "none" }} closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            List new donation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column xs="5">
                Product title
              </Form.Label>
              <Col xs="6">
                <Form.Control
                  name="productTitle"
                  value={productTitle}
                  type="text"
                  placeholder="listing title"
                  onChange={(e) => setProductTitle(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column xs="5">
                Product image URL
              </Form.Label>
              <Col xs="6">
                <Form.Control
                  name="productThumbnail"
                  value={productThumbnail}
                  type="text"
                  placeholder="thumbnail image URL"
                  onChange={(e) => setProductThumbnail(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column xs="5">
                Product description
              </Form.Label>
              <Col xs="6">
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="productDesc"
                  value={productDesc}
                  type="text"
                  placeholder="listing description"
                  onChange={(e) => setProductDesc(e.target.value)}
                />
              </Col>
            </Form.Group>

            <InputGroup as={Row} className="mb-3 text-center">
              <Col xs="6">
                <DropdownButton
                  variant="outline-secondary"
                  title="Category"
                  id="category-dropdown"
                >
                  <Dropdown.Item
                    as="option"
                    value="Food"
                    onClick={(e) => setProductCategory(e.target.value)}
                  >
                    Food
                  </Dropdown.Item>
                  <Dropdown.Item
                    as="option"
                    value="Medicine"
                    onClick={(e) => setProductCategory(e.target.value)}
                  >
                    Medicine
                  </Dropdown.Item>
                  <Dropdown.Item
                    as="option"
                    value="Clothes"
                    onClick={(e) => setProductCategory(e.target.value)}
                  >
                    Clothes
                  </Dropdown.Item>
                  <Dropdown.Item
                    as="option"
                    value="Books"
                    onClick={(e) => setProductCategory(e.target.value)}
                  >
                    Books
                  </Dropdown.Item>
                </DropdownButton>
              </Col>
              <Col xs="5">
                <FormControl value={productCategory} readOnly />
              </Col>
            </InputGroup>

            <div className="text-center">
              <br />
              <Button
                id="add-listing"
                type="submit"
                onClick={props.onHide}
                variant="primary"
              >
                List donation
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddModal;
