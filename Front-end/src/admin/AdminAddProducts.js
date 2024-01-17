import React, {  useState } from "react";
import SideBar from "./SideBar";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminAddProducts = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");

 const handleImageChange = (img) => {
    const selectedImage = img.target.files[0];
    setImage(selectedImage);
   }  
 const handleChangeCategory = (e) => {
  setCategory(e.target.value);
   };
 const handileAdd=async(e)=>{
  e.preventDefault();

  if (!title || !description|| !price ||!image || !category  ) {
    toast.error("Please fill in all fields");
    return;
  }
  const formData=new FormData();
  formData.append("title",title);
  formData.append("description",description);
  formData.append("price",price);
  formData.append("image",image);
  formData.append("category",category)

  try {
    const response= await axios.post("http://localhost:5000/api/admin/products",formData)
    console.log(response);
    if(response.status===201){
      toast.success("Product added successfully!");
      navigate('/adminproduct')
    }else{
      toast.error("Failed to add product.");
    }
  } catch (error) {
    console.error("Error uploading product:", error.message);
    toast.error("Failed to add product.");
  }
 }
  
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
              <Form.Label>Add Product title:</Form.Label>
              <Form.Control
                type="text"
                id="title"  
                placeholder="product title"
                onChange={(e)=>setTitle(e.target.value)} 
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Add product description:</Form.Label>
              <Form.Control
                type="text"
                name="description"
                placeholder="description"
                onChange={(e)=>setDescription(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Add price:</Form.Label>
              <Form.Control
                type="text"
                name="price"
                placeholder="price"
                onChange={(e)=>setPrice(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Add product image:</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleImageChange}
                required
              />
            </Form.Group>
            {/* <Form.Group>
              <Form.Label>Add Stock:</Form.Label>
              <Form.Control
                type="text"
                name="Stock"
                placeholder="Stock"
                value={newProduct.Stock}
                onChange={handleChange}
                required
              />
            </Form.Group>{" "} */}
            <br />
            <Form.Group>
              <Form.Label>Select category:</Form.Label> <br />
              <select
                style={{ width: "200px" }}
                onChange={handleChangeCategory}
                required
              >
                <option value="DOG">DOG</option>
                <option value="CAT">CAT</option>
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
