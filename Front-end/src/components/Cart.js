import React, { useEffect, useState } from "react";
import { Axios} from "../App";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  Container,
} from "react-bootstrap";
import Navigationbar from "./Navigationbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const userId=localStorage.getItem("userId")

const Cart = () => {
  const[cart,setCart]=useState([])
  const [price,setPrice]=useState(0)
  const navigate = useNavigate();

  const fetchCart=async()=>{
    try {
      const response=await Axios.get(`api/users/${userId}/cart`)
      console.log(response.data.data);
      setCart(response.data.data)
    } catch (error) {
      console.log("error fetching the product", error);
      toast.error("error");
    }
  }
  useEffect(()=>{
    fetchCart()
  },[])

  const RemoveCartItem=async(id)=>{
    try {
      const productId=id;
      const response=await Axios.delete(`api/users/${userId}/cart`,{
        data: { productId: productId }  
      })
      fetchCart()
      console.log(response);
    } catch (error) {
      console.log("error fetching the product", error);
      toast.error("error");
    }
  }

  

  const decreaseQuantity = (Id) => {
    const updatedCart = cart.map((item) => {
      if (item._id === Id && item.qty > 1) {
        return { ...item, qty: item.qty - 1 };
      }
      return item;
    });
    setCart(updatedCart);
  };



  const totalCartItem = (item) => {
    return item.price * item.qty;
  };



  const clearCart = () => {
    setCart([]);
  };

  const totalCartPrice = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  return (
    <div style={{ background: "rgb(230, 230, 219)" }}>
      <Navigationbar />
      <Container>
        <h2 style={{ textAlign: "center", padding: "10px" }}> My Cart</h2>
        <hr />
        <div className="d-flex align-items-center justify-content-center flex-wrap">
          {cart.map((item) => (
            <div
              key={item._id}
              className="d-flex align-items-center justify-content-center flex-wrap"
            >
              <Card
                className="shadow p-1 m-2 bg-body-tertiary rounded"
                style={{
                  width: "16rem",
                  height: "26rem",
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <CardBody>
                  <CardImg
                  
                    style={{ height: "10.5rem" ,textAlign: "center" }}
                    className="p-2"
                    variant="top"
                    src={item.image}
                  />
                  <CardTitle style={{ textAlign: "center" }}>
                    {item.title}
                  </CardTitle>
                  <h6 style={{ textAlign: "center" }}>Price: {item.price}</h6>
                  <p style={{ textAlign: "center" }}>Qty: {item.qty}</p>
                  <div style={{ textAlign: "center" }}>
                    <Button >+</Button>
                    <Button
                      onClick={() => decreaseQuantity(item._id)}
                      className="m-1"
                    >
                      -
                    </Button>
                    
                     <h6>Total: ₹ {totalCartItem(item)}</h6>
                  </div>
                  <div>
                    <Button
                      // onClick={() => buyProduct(item.Id)}
                      variant="outline-dark"
                    >
                      Buy Product
                    </Button>
                    <Button
                      className="m-2"
                      variant="outline-dark"
                      onClick={() => RemoveCartItem(item._id)}
                    >
                      Remove
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </div>
          ))}
        </div>
        <div className=" p-5 " style={{ background: "rgb(230, 230, 219)" }}>
          <h2 className="pb-4" style={{ textAlign: "center" }}>
            Total Price:{totalCartPrice}
          </h2>
          
          <div style={{ textAlign: "center" }}>
            <Button onClick={() => navigate("/")}>Back To Home</Button>
            <Button className="m-3" 
            // onClick={AllProduct}
            >
              Buy All Product
            </Button>
            {/* <Button onClick={clearCart} className="m-2">
              Clear Cart
            </Button> */}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Cart;
