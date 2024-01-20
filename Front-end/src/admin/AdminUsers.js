import React, { useContext, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import SideBar from "./SideBar";
import { toast } from "react-toastify";
import { AXIOS } from "../App";

const AdminUsers = () => {
  const [user,setUser]=useState([]);
  useEffect(()=>{
    const allUsers=async()=>{
      try {
        const response=await AXIOS.get("api/admin/users")
        console.log(response.data.data);
        setUser(response.data.data)
      } catch (error) {
        console.log(error)
        toast.error(error.message || "Failed to fetch users")
      }
    }
    allUsers() 
  },[])
  return (
    <div style={{ display: "flex" }}>
      <SideBar />
      <div
        className="mt-4"
        style={{ backgroundColor: "white", width: "70%", margin: "0 auto" }}
      >
        <h1 className="mb-4" style={{ textAlign: "center" }}>
          Users
        </h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>User Name</th>
              <th>E-mail</th>
            </tr>
          </thead>
          {user.map((item) => (
            <tbody>
              <tr>
                <td>{item.username}</td>
                <td>{item.email}</td>
              </tr>
            </tbody>
          ))}
        </Table>
      </div>
    </div>
  );
};

export default AdminUsers;
