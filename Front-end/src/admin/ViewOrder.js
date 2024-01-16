import React, { useContext } from "react";
import SideBar from "./SideBar";
import { UserLogin } from "../App";
import { Container, Table } from "react-bootstrap";

const ViewOrder = () => {
  const { buy } = useContext(UserLogin);
  console.log(buy);
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
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>product name</th>
                <th>price</th>
                <th>Qty</th>
              </tr>
            </thead>
            {buy.map((item) => (
              <tbody>
                <tr>
                  <td>{item.ProductName}</td>
                  <td>{item.Price}</td>
                  <td>{item.Qty}</td>
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
