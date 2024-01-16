import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Navigation.css";
import { useNavigate } from "react-router-dom";
import { HiShoppingCart } from "react-icons/hi2";
import { RiAdminFill } from "react-icons/ri";
import { CiLogin } from "react-icons/ci";

import { UserLogin } from "../App";
import { CiLogout } from "react-icons/ci";
import { toast } from "react-toastify";
import { NavDropdown } from "react-bootstrap";

const Navigationbar = () => {
  const navigate = useNavigate();
 
  const { login, setLogin, setCart, user} = useContext(UserLogin);
  console.log(user);


  const Logout = () => {
    if (login) {
      setLogin(false);
      setCart([]);
      toast.success("Logout Success");
    } else {
      navigate("/login");
    }
  };
  return (
    <Navbar expand="lg" className="nav" sticky="top">
      <Container fluid className="nav-bar">
        <Navbar.Brand>
          <h1   
            title="Home"
            style={{ cursor: "pointer" }}
            className="nav-title"
            onClick={() => navigate("/")}
          >
            Pets Foods
          </h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto nav-links">
            <Nav.Link
              className="underline-collection"
              onClick={() => navigate("/collection")}
            >
              Collection
            </Nav.Link>
            <Nav.Link
              className="underline-cat "
              onClick={() => navigate("/cat")}
            >
              Cat
            </Nav.Link>
            <Nav.Link
              className="underline-dog"
              onClick={() => navigate("/dog")}
            >
              Dog
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="icons" style={{ justifyContent: "end" }}>
          <Nav style={{ gap: "0.6rem", alignItems: "center" }}>
            
            <Nav.Link
              onClick={() => navigate("/cart")}
              style={{ fontSize: "27px" }}
              title="Cart"
            >
               
              <HiShoppingCart />
            </Nav.Link>

            {login ? (
               <NavDropdown  style={{ fontSize: "27px" }} title={<CiLogout onClick={Logout} />} id="basic-nav-dropdown">
               <NavDropdown.Item href="#action/3.1">{user.email}</NavDropdown.Item>
               
             </NavDropdown>
             
            ): (
              <Nav.Link
                onClick={() => navigate("/login")}
                style={{ fontSize: "27px" }}
                title="login"
              >
                <CiLogin />
              </Nav.Link>
            )}

            <Nav.Link
              style={{ fontSize: "27px" }}
              onClick={() => navigate("/adminlogin")}
              title="Admin"
            >
              <RiAdminFill />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigationbar;
