import React, { useContext } from "react";
import { UserLogin } from "../App";
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

const Cart = () => {
  const { cart, setCart, buy, setBuy } = useContext(UserLogin);
  const navigate = useNavigate();

  const increaseQuantity = (Id) => {
    const updatedCart = cart.map((item) => {
      if (item.Id === Id && item.Qty < item.Stock) {
        return { ...item, Qty: item.Qty + 1 };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const decreaseQuantity = (Id) => {
    const updatedCart = cart.map((item) => {
      if (item.Id === Id && item.Qty > 1) {
        return { ...item, Qty: item.Qty - 1 };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const removeItem = (Id) => {
    const updatedCart = cart.filter((item) => item.Id !== Id);
    setCart(updatedCart);
  };

  const totalCartItem = (item) => {
    return item.Price * item.Qty;
  };

  const buyProduct = (Id) => {
    const productToBuy = cart.find((item) => item.Id === Id);
    if (productToBuy) {
      const updatedCart = cart.filter((item) => item.Id !== Id);
      setBuy([...buy, productToBuy]);
      setCart(updatedCart);
      toast.success("Successfully bought the product");
    }
  };
  const AllProduct = () => {
    setBuy([...buy, ...cart]);
    setCart([]);
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalCartPrice = cart.reduce(
    (total, item) => total + item.Price * item.Qty,
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
              key={item.Id}
              className="d-flex align-items-center justify-content-center flex-wrap"
            >
              <Card
                className="shadow p-1 m-2 bg-body-tertiary rounded"
                style={{
                  width: "18rem",
                  height: "31rem",
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
                    src={item.Image}
                  />
                  <CardTitle style={{ textAlign: "center" }}>
                    {item.ProductName}
                  </CardTitle>
                  <h6 style={{ textAlign: "center" }}>Price: {item.Price}</h6>
                  <p style={{ textAlign: "center" }}>Qty: {item.Qty}</p>
                  <div style={{ textAlign: "center" }}>
                    <Button onClick={() => increaseQuantity(item.Id)}>+</Button>
                    <Button
                      onClick={() => decreaseQuantity(item.Id)}
                      className="m-1"
                    >
                      -
                    </Button>
                    <h6>Total: ₹{totalCartItem(item)}</h6>
                  </div>
                  <div>
                    <Button
                      onClick={() => buyProduct(item.Id)}
                      variant="outline-dark"
                    >
                      Buy Product
                    </Button>
                    <Button
                      className="m-2"
                      variant="outline-dark"
                      onClick={() => removeItem(item.Id)}
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
            Total Price: {totalCartPrice}
          </h2>
          <div style={{ textAlign: "center" }}>
            <Button onClick={() => navigate("/")}>Back To Home</Button>
            <Button className="m-2" onClick={AllProduct}>
              Buy All Product
            </Button>
            <Button onClick={clearCart} className="m-2">
              Clear Cart
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Cart;
