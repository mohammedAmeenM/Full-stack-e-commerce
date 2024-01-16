import React, { useEffect, useState } from "react";
import Navigationbar from "./Navigationbar";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  Container,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

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
                  width: "15rem",
                  height: "25rem",
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <CardBody>
                  <CardImg
                    style={{ height: "11rem" }}
                    className="p-2"
                    variant="top"
                    src={item.image}
                  />
                  <br />
                  <br />
                  <CardTitle style={{ textAlign: "center" }}>
                    {item.title}
                  </CardTitle>
                  <br />
                  <h6 style={{ textAlign: "center" }}>Price:{item.price}</h6>
                </CardBody>
                <div>
                  <Button
                    onClick={() => navigate(`/viewproduct/${item._id}`)}
                    variant="outline-dark"
                  >
                    View Product
                  </Button>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Cat;
