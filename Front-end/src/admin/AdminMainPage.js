import React from "react";
import SideBar from "./SideBar";

const AdminMainPage = () => {
  return (
    <div style={{ display: "flex" }}>
      <SideBar />
      <div style={{ flex: 1, textAlign: "center", padding: "20px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1>Heeyh Admiinnnn.....</h1>
          <br />
          <p style={{ fontSize: "28px", color: "red" }}>Welcomeee.....</p>
        </div>
      </div>
    </div>
  );
};

export default AdminMainPage;
