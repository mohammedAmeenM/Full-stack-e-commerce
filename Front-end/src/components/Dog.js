import React, { useContext, useEffect, useState } from "react";
import Navigationbar from "./Navigationbar";
import { UserLogin } from "../App";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  Container,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Dog = () => {
  const navigate = useNavigate();
  const [product,setProduct]=useState([])

  const category="DOG";

  useEffect(()=>{
    const DogProducts=async()=>{
        try {
           const response=await axios.get(`http://localhost:5000/api/users/products/category/${category}`)
           console.log(response.data.products);
           setProduct(response.data.products)
        } catch (error) {
          console.log("error fetching the product",error)
         toast.error("error")
        }
    }
    DogProducts()
  },[])

  return (
    <div style={{ background: "rgb(230, 230, 219)" }}>
      <Navigationbar />
      <Container>
        <h1 style={{ textAlign: "center", padding: "10px" }}>Dog Products</h1>
        <hr />

        <div className="d-flex align-items-center justify-content-center flex-wrap">
          {product.map((item) => (
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
                    style={{ height: "12rem" }}
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

export default Dog;
