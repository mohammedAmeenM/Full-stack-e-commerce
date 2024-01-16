import React, { useContext, useState } from "react";
import SideBar from "./SideBar";
import { useNavigate, useParams } from "react-router-dom";
import { UserLogin } from "../App";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { product, setProduct } = useContext(UserLogin);

  const editProduct = product.find((item) => item.Id === parseInt(id));

  const [productName, setProductName] = useState(editProduct.ProductName);
  const [price, setPrice] = useState(editProduct.Price);
  const [oldPrice, setOldPrice] = useState(editProduct.OldPrice);
  const [animal, setAnimal] = useState(editProduct.Animal);
  const [image, setImage] = useState(editProduct.Image);
  const [stock, setStock] = useState(editProduct.Stock);
  console.log(editProduct);
  const submit = (e) => {
    e.preventDefault();

    const updatedProduct = {
      ...editProduct,
      Image: image,
      ProductName: productName,
      OldPrice: oldPrice,
      Price: price,
      Animal: animal,
      Stock: stock,
    };

    const updatedProducts = product.map((item) =>
      item.Id === parseInt(id) ? updatedProduct : item
    );
    console.log(updatedProduct);
    setProduct(updatedProducts);
    toast.success("successfully edited");
    navigate("/adminproduct");
  };

  return (
    <div style={{ display: "flex" }}>
      <SideBar />
      <div style={{ flex: 1, textAlign: "center", padding: "20px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ display: "block", width: 700 }}>
            <h4>Edit product</h4> <hr />
            <Form onSubmit={submit}>
              <Form.Group>
                <Form.Label>Edit Img src:</Form.Label>
                <Form.Control
                  type="text"
                  name="Image"
                  defaultValue={editProduct.Image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Edit product name:</Form.Label>
                <Form.Control
                  type="text"
                  name="ProductName"
                  defaultValue={editProduct.ProductName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Edit price:</Form.Label>
                <Form.Control
                  type="text"
                  name="OldPrice"
                  defaultValue={editProduct.OldPrice}
                  onChange={(e) => setOldPrice(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Edit Actual price:</Form.Label>
                <Form.Control
                  type="text"
                  name="Price"
                  defaultValue={editProduct.Price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Edit Animal:</Form.Label> <br />
                <select
                  style={{ width: "200px" }}
                  name="Aminal"
                  defaultValue={editProduct.Animal}
                  onChange={(e) => setAnimal(e.target.value)}
                >
                  <option value="Dog">Dog</option>
                  <option value="Cat">Cat</option>
                </select>
              </Form.Group>
              <Form.Group>
                <Form.Label>Edit Stock:</Form.Label>
                <Form.Control
                  type="text"
                  name="Stock"
                  defaultValue={editProduct.Stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </Form.Group>
              <Button className="m-3" type="submit" variant="primary">
                Save
              </Button>
              <Button className="m-3" onClick={() => navigate("/adminproduct")}>
                Cancel
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
