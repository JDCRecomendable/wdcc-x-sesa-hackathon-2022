import React from "react";

const PurchaseButton = ({ cost, purchase }) => {
  return (
    <div
      onClick={purchase}
      style={{
        position: "fixed",
        width: "12%",
        height: "8%",
        backgroundColor: "#371B58",
        marginLeft: "65%",
        borderRadius: "50px",
        bottom: "5%",
        color: "#fff",
        fontSize: "40px",
        font: "Georgia",
        textAlign: "center",
      }}
    >
      ${cost}
    </div>
  );
};

export default PurchaseButton;
