import React, { useEffect, useState } from "react";
import Navigationbar from "./Navigationbar";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardTitle,
  Container,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { Axios } from "../App";
const userId=localStorage.getItem('userId')

const Cat = () => {
  const navigate = useNavigate();
  const [products,setProducts]=useState([]);
  const category="CAT";

  useEffect(()=>{
    const catProducts=async()=>{
      try {
        const response=await axios.get(`http://localhost:5000/api/users/products/category/${category}`)
       
        setProducts(response.data.products)
      } catch (error) {
        console.log("error fetching the product",error)
         toast.error("error")
      }
    }
    catProducts()
  },[])
  const addToWishList=async(id)=>{
    try {
      await Axios.post(`api/users/${userId}/wishlist`,{productId:id})
      return toast.success("Product added to the wishlist!")
   
    } catch (error) {
      console.error('Error adding product to the whislist:', error)
      toast.error(error.response.data.message)
    }
  }
  
  
  return (
    <div style={{ background: "rgb(230, 230, 219)" }}>
      <Navigationbar />
      <Container>
        <h1 style={{ textAlign: "center", padding: "10px" }}>Cat Products</h1>
        <hr />

        <div className="d-flex align-items-center justify-content-center flex-wrap">
          {products.map((item) => (
            <div
              key={item._id}
              className="d-flex align-items-center justify-content-center flex-wrap"
            >
              <Card
                className="shadow p-3 m-2 bg-body-tertiary rounded"
                style={{
                  width: "12rem",
                  height: "22rem",
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <CardSubtitle title="wishlist" style={{display:'flex',marginLeft:'-150px',fontSize:'22px'}} onClick={()=>addToWishList(item._id)}><    FaHeart /></CardSubtitle>

                <CardBody>
                  <CardImg
                    style={{ height: "9rem", width:'8rem',textAlign:'center'}}
                    className="p-2"
                    variant="top"
                    onClick={() => navigate(`/viewproduct/${item._id}`)}
                    src={item.image}
                  />
                  <br />
                
                  <CardTitle style={{ textAlign: "center" }}>
                    {item.title}
                  </CardTitle>
                  <br />
                  <h6 style={{ textAlign: "center" }}>Price:{item.price}</h6><br />
                  <CardTitle style={{ textAlign: "center" }}>
                  <Button
                    onClick={() => navigate(`/viewproduct/${item._id}`)}
                    variant="outline-dark"
                    >
                    View Product
                  </Button>
                    </CardTitle>
                </CardBody>
                
              </Card>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Cat;
