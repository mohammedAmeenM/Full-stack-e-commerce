import React, { useContext, useState } from "react";
import SideBar from "./SideBar";
import { Button, Form } from "react-bootstrap";
import { UserLogin } from "../App";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdminAddProducts = () => {
  const navigate = useNavigate();
  const { product, setProduct } = useContext(UserLogin);
  const [newProduct, setNewProduct] = useState({
    ProductName: "",
    Image: "",
    OldPrice: "",
    Price: "",
    Animal: "",
    Stock: "",
  });
  const [newId, setNewId] = useState(0);
  product.forEach((item) => {
    if (item.Id > newId) {
      setNewId(item.Id);
    }
  });
  const AddId = newId + 1;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handileAdd = (e) => {
    e.preventDefault();
    if (
      !newProduct.Image ||
      !newProduct.ProductName ||
      !newProduct.OldPrice ||
      !newProduct.Price ||
      !newProduct.Animal ||
      !newProduct.Stock
    ) {
      toast.error("fill");
    }
    const newProductList = {
      Id: AddId,
      Image: newProduct.Image,
      ProductName: newProduct.ProductName,
      OldPrice: newProduct.OldPrice,
      Price: newProduct.Price,
      Qty: 1,
      Animal: newProduct.Animal,
      Stock: newProduct.Stock,
    };
    console.log(newProductList);

    setProduct([...product, newProductList]);
    navigate("/adminproduct");
  };
  return (
    <div style={{ display: "flex" }}>
      <SideBar />
      <div style={{ flex: 1, textAlign: "center" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1>Add products</h1>
          <br />
          <Form style={{ width: "500px" }}>
            <Form.Group>
              <Form.Label>Add Img src:</Form.Label>
              <Form.Control
                type="text"
                name="Image"
                placeholder="eg:https://a45fd48de1256.jpg"
                value={newProduct.Image}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Add product name:</Form.Label>
              <Form.Control
                type="text"
                name="ProductName"
                placeholder="ProductName"
                value={newProduct.ProductName}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Add price:</Form.Label>
              <Form.Control
                type="text"
                name="OldPrice"
                placeholder="Price"
                value={newProduct.OldPrice}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Add Actual price:</Form.Label>
              <Form.Control
                type="text"
                name="Price"
                placeholder="Actual Price"
                value={newProduct.Price}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Add Stock:</Form.Label>
              <Form.Control
                type="text"
                name="Stock"
                placeholder="Stock"
                value={newProduct.Stock}
                onChange={handleChange}
                required
              />
            </Form.Group>{" "}
            <br />
            <Form.Group>
              <Form.Label>Select Animal:</Form.Label> <br />
              <select
                style={{ width: "200px" }}
                type="text"
                name="Animal"
                value={newProduct.Animal}
                onChange={handleChange}
                required
              >
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
              </select>
            </Form.Group>
            <Button
              className="mt-3"
              type="submit"
              variant="primary"
              onClick={handileAdd}
            >
              Save
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AdminAddProducts;
