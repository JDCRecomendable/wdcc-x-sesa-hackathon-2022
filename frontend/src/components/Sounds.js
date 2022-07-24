import React, { useState } from "react";
import { IconButton } from "@mui/material";
import PurchaseButton from "./PurchaseButton";
const axios = require("axios");

const options = [
  "Baby screaming",
  "Fart",
  "Footsteps",
  "Knock",
  "Scream",
  "Dance",
  "Whisper",
  "Horror sound",
];

const Sounds = () => {
  const [selected, setSelected] = useState("");

  const handleClick = e => {
    setSelected(e.target.id);
  };

  const optionsList = options.map(option => (
    <IconButton
      style={{ marginRight: "20px", color: "#371B58", font: "fantasy" }}
      id={option}
      key={option}
      onClick={handleClick}
    >
      {option}
    </IconButton>
  ));

  const purchase = () => {
    axios
      .post("http://ripscamera0c.pythonanywhere.com/common/Alpha/attack", {
        tgtUserID: "Beta",
        attackID: 1,
        details: { selected },
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
      <h1>Sounds</h1>
      {optionsList}
      <PurchaseButton cost={400} type="sound" purchase={purchase} />
    </>
  );
};

export default Sounds;
