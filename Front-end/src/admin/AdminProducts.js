import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import { Button, Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { AXIOS } from "../App";

const AdminProducts = () => {
  const navigate = useNavigate();
  const [product,setProduct]=useState([])

  async function allProducts (){
    try {
        const response=await AXIOS.get("api/admin/products")
        console.log(response.data.products);
        setProduct(response.data.products)
      } catch (error) {
        console.log(error)
        toast.error(error.message || "Failed to fetch products")
      }
    }
    useEffect(()=>{
    allProducts()
  },[])

  const Remove=async(id)=>{
    try {
     const productId=id;
     console.log(productId  )
     const response = await AXIOS.delete("api/admin/products", {
      data: { productId: productId }  
    })
    allProducts()
      console.log(response);
    } catch (error) {
      console.log(error)
        toast.error(error.message || "Failed to fetch products")
    }

  }
 
  return (
    <div style={{ display: "flex" }}>
      <SideBar />

      <Container
        fluid
        className="mt-3"
        style={{ overflow: "scroll", height: "90vh" }}
      >
        <h1 className="mb-4" style={{ textAlign: "center" }}>
          All products
        </h1>
        <hr />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Image</th>
              <th>Name</th>

              
              <th>Actual Price</th>
              <th>Animal</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
            {product.map((item) => (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td style={{ textAlign: "center" }}>
                  <img
                    style={{ height: "2rem" }}
                    src={item.image}
                    alt={item.title}
                  />
                </td>
                <td>{item.title}</td>
                
                <td>{item.price}</td>
                <td>{item.category}</td>
                <td>{item.stock}</td>
                <td style={{ textAlign: "center" }}>
                  <Button
                    style={{ marginRight: "30px" }}
                    onClick={() => navigate(`/editproduct/${item._id}`)}
                  >
                    Edit
                  </Button>
                  <Button className="bg-danger" onClick={()=>Remove(item._id)}>
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </thead>
        </Table>
      </Container>
    </div>
  );
};

export default AdminProducts;
