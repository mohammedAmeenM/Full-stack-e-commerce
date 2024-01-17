import React, { useContext, useEffect, useState } from "react";
import SideBar from "./SideBar";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product,setProduct]=useState({
      title: "",
      image: "",
      description: "",
      price: "",
      category: "",
   })

   useEffect(()=>{
      const fetchProduct=async()=>{
        try {
           const response=await axios.get(`http://localhost:5000/api/admin/products/${id}`)
           console.log(response.data.product);
           const { _id, title, image, price, description, category } = response.data.product;
           setProduct({ 
            id: _id,
            title,
            image,
            price,
            category,
            description
          })
         
        } catch (error) {
           console.log(error)
           toast.error(error.message || "Failed to fetch products")
        }
      }
      fetchProduct()
   },[id])

 
  
  const submit = async(e) => {
    e.preventDefault();
    try {
      const response=await axios.put("http://localhost:5000/api/admin/products",product)
      console.log(response);
      if (response.status === 201) {
        toast.success("Product Edited Successfully");
        navigate('/adminproduct')
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
   
  };

  const handleChange =  (a) => {
    const { name, value } = a.target;
    console.log(value)
    setProduct((PrevData) => ({
      ...PrevData,
      [name]: value,
    }));
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
                   name="title"
                   id="title"
                  value={product.title}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Edit product name:</Form.Label>
                <Form.Control
                  type="text"
                  name="ProductName"
                  value={product.image}
                  onChange={handleChange}
                />
              </Form.Group>
               <Form.Group>
                <Form.Label>Edit description:</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  id="description"
                  value={product.description}
                  onChange={handleChange}
                />
              </Form.Group> 
              <Form.Group>
                <Form.Label>Edit Actual price:</Form.Label>
                <Form.Control
                   type="text"
                   name="price"
                   id="price"
                  value={product.price}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Edit Category:</Form.Label> <br />
                <select
                  style={{ width: "200px" }}
                  type="text"
                  name="category"
                  id="category"
                  value={product.category}
                  onChange={handleChange}
                >
                  <option value="DOG">DOG</option>
                  <option value="CAT">CAT</option>
                </select>
              </Form.Group>
              {/* <Form.Group>
                <Form.Label>Edit Stock:</Form.Label>
                <Form.Control
                  type="text"
                  name="Stock"
                  defaultValue={editProduct.Stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </Form.Group> */}
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
