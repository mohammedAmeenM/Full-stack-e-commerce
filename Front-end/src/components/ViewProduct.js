import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  Container,
} from "react-bootstrap";
import { UserLogin } from "../App";
import Navigationbar from "./Navigationbar"; 
import { toast } from "react-toastify";
import axios from "axios";

const ViewProduct = () => {
  const navigate = useNavigate();
  const {  cart, setCart} = useContext(UserLogin);
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const viewProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/products/${id}`)
        setProduct(response.data.product);
      } catch (error) {
        console.log("error fetching the product", error);
        toast.error("error");
      }
    }
    viewProduct();
  }, [id]);

  return (
    <div style={{ background: "rgb(230, 230, 219)" }}>
      <Navigationbar />

      <Container className="d-flex justify-content-center align-items-center mt-5">
        {product && (
          <div key={product._id} style={{ alignItems: "center" }}>
            <Card
              className="shadow p-1 m-2 bg-body-tertiary rounded"
              style={{
                width: "18rem",
                height: "28rem",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardBody>
                <CardImg
                  style={{ height: "15rem" }}
                  className="p-2"
                  variant="top"
                  src={product.image}
                />
                <br />
                <CardTitle style={{ textAlign: "center" }}>
                  {product.title}
                </CardTitle>
                
                <h6 style={{ textAlign: "center" }}>
                  Offer Price : {product.price}
                </h6>
                <p style={{ textAlign: "center" }}>Animal : {product.category}</p>
              </CardBody>
              <div>
                {cart.find((cartItem) => cartItem.Id === product[0].Id) ? (
                  <Button
                    variant="outline-dark"
                    onClick={() => navigate("/cart")}
                  >
                    Go To Cart
                  </Button>
                ) : (
                  <Button variant="outline-dark">
                    Add To Cart
                  </Button>
                )}
              </div>
            </Card>
          </div>
        )}
      </Container>
    </div>
  );
};

export default ViewProduct;
