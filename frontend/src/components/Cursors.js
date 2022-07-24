import React from "react";
import Button from "@mui/material/Button";
import PurchaseButton from "./PurchaseButton";
const axios = require("axios");

const Cursors = () => {
  const purchase = () => {
    axios
      .post("http://ripscamera0c.pythonanywhere.com/common/Alpha/attack", {
        tgtUserID: "Beta",
        attackID: 3,
        details: "",
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <h1>Surprise Party!</h1>
      <h3>Send a colourful surprise to your friends</h3>
      <PurchaseButton cost={600} type="surprise" purchase={purchase} />
    </>
  );
};

export default Cursors;
