import React, { useContext, useRef, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserLogin } from "../App";
import axios from "axios";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserLogin);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [errorMessage, setErrorMessage] = useState("");

  const submitClick = async (e) => {
    e.preventDefault();
    const setName = nameRef.current.value;
    const setEmail = emailRef.current.value;
    const setPassword = passwordRef.current.value;

    if (!setName || !setEmail || !setPassword) {
      setErrorMessage("Please fill in all fields.");
      return;
    }
    const isEmailValid = setEmail.includes("@") && setEmail.includes(".");
    if (!isEmailValid) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (setPassword.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }
    if (user.find((sameuser) => sameuser.name === setName)) {
      setErrorMessage(
        "Username already exists. Please choose a different one."
      );
      return;
    }
    setErrorMessage("");
    const value = { name: setName, email: setEmail, password: setPassword };

    setUser([...user, value]);

    try {
      const data = {
        username: setName,
        email: setEmail,
        password: setPassword,
      };

      console.log(data);

      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);
      toast.success("success");
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "An error occurred");
    }
    // navigate("/login");
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
        <h1 style={{ textAlign: "center" }}>Sign up</h1>
        <Form
          className="border p-4 m-4 bg-white"
          style={{ borderRadius: "20px", textAlign: "center" }}
        >
          <input
            type="text"
            name="text"
            placeholder="User Name"
            required
            ref={nameRef}
            style={{
              width: "300px",
              height: "40px",
              borderRadius: "10px",
              border: "1.2px solid",
            }}
          />
          <br />
          <br />
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            ref={emailRef}
            required
            style={{
              width: "300px",
              height: "40px",
              borderRadius: "10px",
              border: "1.2px solid",
            }}
          />
          <br />
          <br />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            ref={passwordRef}
            style={{
              width: "300px",
              height: "40px",
              borderRadius: "10px",
              border: "1.2px solid",
            }}
          />
          <br />
          <br />
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

          <Button variant="outline-dark" onClick={submitClick}>
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Signup;
