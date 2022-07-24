import React from "react";
import Button from "@mui/material/Button";
import PurchaseButton from "./PurchaseButton";

const Cursors = () => {
  return (
    <>
      <h1>Surprise Party!</h1>
      <h3>Send a colourful surprise to your friends</h3>
      <Button variant="outlined">Throw a surprise party</Button>
      <PurchaseButton cost={600} type="surprise" item_id={3} details="" />
    </>
  );
};

export default Cursors;
