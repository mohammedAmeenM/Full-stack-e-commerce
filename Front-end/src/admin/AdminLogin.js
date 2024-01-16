import React, { useRef, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminLogin = () => {
  const navigate = useNavigate();
  const adminName = useRef();
  const adminPassword = useRef();
  const [error, setErrorMessage] = useState("");
  const handileAdmin = () => {
    const newAdminName = adminName.current.value;
    const newAdminPassword = adminPassword.current.value;

    if (!newAdminName || !newAdminPassword) {
      setErrorMessage("Please fill in all fields.");
      return;
    }
    if (newAdminName !== "admin") {
      setErrorMessage("Please Enter correct Username");
      return;
    }
    if (newAdminPassword !== "admin123") {
      setErrorMessage("please enter correct Password");
    }
    const Admin = newAdminName === "admin" && newAdminPassword === "admin123";
    if (Admin) {
      toast.success("admin Login success");
      navigate("/adminpage");
    } else {
      toast.error("please enter valied username or password");
    }
  };
  return (
    <div>
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
          <h1 style={{ textAlign: "center" }}>Admin Login </h1>
          <div>
            <Form
              className="border p-4 m-4 bg-white"
              style={{ borderRadius: "20px", textAlign: "center" }}
            >
              <input
                ref={adminName}
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
              <input
                ref={adminPassword}
                type="password"
                placeholder="Password"
                style={{
                  width: "300px",
                  height: "40px",
                  borderRadius: "10px",
                  border: "1.2px solid",
                }}
              />
              <br />
              <br />
              {error && (
                <p style={{ color: "red", textAlign: "center" }}>{error}</p>
              )}
              <div style={{ textAlign: "center" }}>
                <div>
                  <Button onClick={handileAdmin} variant="outline-dark">
                    Login
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default AdminLogin;
