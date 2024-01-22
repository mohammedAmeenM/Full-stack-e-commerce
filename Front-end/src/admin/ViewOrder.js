import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";

import { Container, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { AXIOS } from "../App";

const ViewOrder = () => {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await AXIOS.get("api/admin/orders");
        console.log(response.data.products);
        if (response.status === 200) {
          setOrder(response.data.products);
        }
      } catch (error) {
        console.log("error fetching the product", error);
        toast.error("error");
      }
    };
    fetchOrders();
  }, []);
  return (
    <div className="d-flex">
      <SideBar />
      <Container
        fluid
        className="mt-3"
        style={{ overflow: "scroll", height: "90vh" }}
      >
        <div style={{ flex: "1", textAlign: "center" }}>
          <h1>Order List</h1>
          <br />
          <hr />
          <Table striped hover style={{ background: "rgb(243, 243, 245" }}>
            <thead>
              <tr>
                <th>date</th>
                <th>time</th>
                <th>payment_id</th>
                <th>products_id</th>
                <th>total</th>
              </tr>
            </thead>
            {order.map((item) => (
              <tbody>
                <tr>
                  <td>{item.date}</td>
                  <td>{item.time}</td>
                  <td>{item.payment_id}</td>
                  {item.products.map((pro) => (
                    <ul style={{ display: "flex" }}>
                      <li>{pro}</li>
                    </ul>
                  ))}
                  <td>💲{item.total_amount}</td>
                </tr>
              </tbody>
            ))}
          </Table>
        </div>
      </Container>
    </div>
  );
};

export default ViewOrder;
