import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Navigation.css";
import { useNavigate } from "react-router-dom";
import { HiShoppingCart } from "react-icons/hi2";
import { RiAdminFill } from "react-icons/ri";
import { CiLogin, CiLogout } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { UserLogin } from "../App";
import { toast } from "react-toastify";
import { NavDropdown } from "react-bootstrap";
import Login from "./Login";
import { FaHouseUser } from "react-icons/fa";

const Navigationbar = () => {
  const navigate = useNavigate();

  const { login, setLogin, setCart, user } = useContext(UserLogin);

  const Logout = () => {
    if (login) {
      setLogin(false);
      setCart([]);
      toast.success("Logout User");
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
        <Navbar.Collapse className="icons" style={{ justifyContent: "end"}}>
          <Nav style={{ gap: "0.6rem", alignItems: "center" }}>
            <Nav.Link
              style={{ fontSize: "27px" }}
              onClick={() => navigate("/adminlogin")}
              title="Admin"
            >
              <RiAdminFill />
            </Nav.Link>
            <NavDropdown
              style={{ fontSize: "27px" }}
              title={<FaHouseUser />}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="#action/3.1"></NavDropdown.Item>
              {/* Add more user profile details here */}
              <NavDropdown.Item>
                <Nav.Link
                  onClick={() => navigate("/cart")}
                  style={{ fontSize: "27px" }}
                  title="Cart"
                >
                  <HiShoppingCart />
                </Nav.Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Nav.Link
                  onClick={() => navigate("/wishlist")}
                  style={{ fontSize: "25px" }}
                  title="wishlist"
                >
                  <FaHeart />
                </Nav.Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Nav.Link
                  onClick={() => navigate("/login")}
                  style={{ fontSize: "27px" }}
                  title="login"
                >
                  <CiLogin />
                </Nav.Link>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigationbar;
