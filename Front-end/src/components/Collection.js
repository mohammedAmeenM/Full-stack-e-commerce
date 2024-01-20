import React, { useContext, useEffect, useState } from "react";
import { Axios, UserLogin } from "../App";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardTitle,
  Container,
  Form,
} from "react-bootstrap";
import Navigationbar from "./Navigationbar";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const userId = localStorage.getItem("userId");

const Collection = () => {
  const navigate = useNavigate();
  const { search, setSearch } = useContext(UserLogin);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const allProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/users/products"
        );
        setProducts(response.data.products);
      } catch (err) {
        console.log(err);
        toast.error(err.message || "Failed to fetch products");
      }
    };
    allProducts();
  }, []);

  const Searches = products.filter((srch) => {
    if (search === "") {
      return srch;
    } else if (srch.title.toLowerCase().includes(search.toLowerCase())) {
      return srch;
    } else {
      return "";
    }
  });
  const addToWishList = async (id) => {
    try {
      const response = await Axios.post(`api/users/${userId}/wishlist`, {
        productId: id,
      });
      console.log(response);
      if (response.status === 200) {
        return toast.success("Product added to the wishlist!");
      }
    } catch (error) {
      console.error("Error adding product to the whislist:", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div style={{ background: "rgb(230, 230, 219)" }}>
      <Navigationbar />
      <Container fluid>
        <Form className=" m-4">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ height: "45px", width: "250px" }}
          />
        </Form>
      </Container>

      <Container>
        <h1 style={{ textAlign: "center", padding: "10px" }}>Collections</h1>
        <hr />

        <div className="d-flex align-items-center justify-content-center flex-wrap">
          {Searches.map((item) => (
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
                <CardSubtitle
                  title="wishlist"
                  style={{
                    display: "flex",
                    marginLeft: "-150px",
                    fontSize: "22px",
                  }}
                  onClick={() => addToWishList(item._id)}
                >
                  <FaHeart />
                </CardSubtitle>
                <CardBody>
                  <CardImg
                    style={{
                      height: "9rem",
                      width: "8rem",
                      textAlign: "center",
                    }}
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
                  <h6 style={{ textAlign: "center" }}>Price:{item.price}</h6>
                  <br />
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

export default Collection;
