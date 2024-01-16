import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <div>
      <footer
        className="footer  p-5"
        style={{ background: "rgb(223, 219, 219)" }}
      >
        <div className="row " style={{ color: "black" }}>
          <Container
            fluid
            className="flex-warp"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div className="flex-warp">
              <h3>Blep</h3>
              <hr />
              <div>
                <p>
                  <b>Contact Us </b>
                </p>
                <p>
                  <b>Track Order </b>
                </p>
                <p>
                  <b>Privacy Policy</b>
                </p>
                <p>
                  <b>Refund Policy</b>
                </p>
              </div>
            </div>
            <div className="flex-warp">
              <h3>Quick</h3>
              <hr />
              <div>
                <p>
                  <b>FAQs</b>
                </p>
                <p>
                  <b>Blogs </b>
                </p>
                <p>
                  <b>Shop</b>
                </p>
                <p>
                  <b>Terms of Service</b>
                </p>
              </div>
            </div>

            <div className="flex-warp" style={{ alignItems: "end" }}>
              <h3>Contact us</h3>
              <hr />
              <div>
                <p>
                  <b>Call : </b>+918714710090
                </p>
                <p>
                  <b>Email : </b>amiame@gmail.com
                </p>
                <p>
                  <b>Address : </b>Kinfra,kakancheri
                </p>
              </div>
            </div>
          </Container>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
