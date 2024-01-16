import React from "react";
import Navigationbar from "./Navigationbar";
import Banner from "./Banner";
import Footer from "./Footer";
import dog from "../Assets/dog-r.png";
import cat from "../Assets/car-r.png";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div style={{ background: "rgb(230, 230, 219)" }}>
      <Navigationbar />
      <Banner />
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <Container
          fluid
          className="d-flex align-items-center justify-content-center flex-wrap"
        >
          <img
            style={{ cursor: "pointer" }}
            src={dog}
            alt="dog cart"
            onClick={() => navigate("/dog")}
            title="Dog Collection"
          />
          <img
            style={{ cursor: "pointer" }}
            src={cat}
            alt="cat cart"
            onClick={() => navigate("/cat")}
            title="Cat Collection"
          />
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
