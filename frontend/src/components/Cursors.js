import React from "react";
import ConfirmPurchase from "./ConfirmPurchase";

const Cursors = () => {
  return (
    <>
      <h1>Surprise Party!</h1>
      <h3>Send a colourful surprise to your friends</h3>
      <ConfirmPurchase
        name="Surprise party"
        price="200"
        description="What is this? It will be a surprise for you too!"
        buttonText="Throw a surprise party"
      />
    </>
  );
};

export default Cursors;
