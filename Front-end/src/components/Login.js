import React, { useRef, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const nameRef = useRef(null);
  const passwordRef = useRef(null);
  const [error, setErrorMessage] = useState("");

  const handileclick = async (e) => {
    e.preventDefault();
    const newNameRef = nameRef.current.value;
    const newPasswordRef = passwordRef.current.value;
    if (!newNameRef || !newPasswordRef) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    try {
      const data = {
        username: newNameRef,
        password: newPasswordRef,
      };
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        data
      );
      console.log(response.data.data.user._id);
      if (response.status === 200) {
        localStorage.setItem("user_Token", response.data.token);
        localStorage.setItem("userId", response.data.data.user._id);
        setTimeout(() => {
          localStorage.removeItem("user_Token");
          localStorage.removeItem("userId");
        }, 3600000);
        console.log(response.data.token);
        toast.success("success");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }

    // const findName = user.find((users) => users.name === newNameRef);
    // const findPassword = user.find(
    //   (users) => users.password === newPasswordRef
    // );
    // if (!findName) {
    //   setErrorMessage("Please correct Username");
    //   return;
    // }
    // if (!findPassword) {
    //   setErrorMessage("please correct Password");
    //   return;
    // }

    // if (findName && findPassword) {
    //   setLogin(true);
    //   navigate("/");
    //   toast.success("Login Success!");
    // }
  };

  return (
    <div style={{ alignItems: "center" }} className="p-4  mt-4 ">
      <Container
        className="border p-4  mt-5 "
        style={{
          width: "500px",
          alignItems: "center",
          borderRadius: "20px",
          background: "rgb(230, 230, 219)",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Login </h1>
        <div style={{ textAlign: "center" }}>
          <Form
            className="border p-4 m-4 bg-white"
            style={{ borderRadius: "20px" }}
          >
            <input
              ref={nameRef}
              type="text"
              placeholder="User Name.."
              style={{
                width: "300px",
                height: "40px",
                borderRadius: "10px",
                border: "1.2px solid",
              }}
            />
            <br />
            <br />
            <div className="mb-3">
              <input
                ref={passwordRef}
                type="password"
                placeholder="Password"
                style={{
                  width: "300px",
                  height: "40px",
                  borderRadius: "10px",
                  border: "1.2px solid",
                }}
              />
            </div>

            {error && (
              <p style={{ color: "red", textAlign: "center" }}>{error}</p>
            )}
            <div className="d-flex">
              <div className="col-8 " style={{ textAlign: "left" }}>
                <Button variant="outline-dark" onClick={handileclick}>
                  Login
                </Button>
              </div>
              <div className="col-4">
                <p>
                  <Link to="/signup">Register Here</Link>
                </p>
              </div>
            </div>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default Login;
