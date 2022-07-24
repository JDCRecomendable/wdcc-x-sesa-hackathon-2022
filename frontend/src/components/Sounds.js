import React, { useState } from "react";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import PurchaseButton from "./PurchaseButton";

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
  return (
    <>
      <h1>Sounds</h1>
      {optionsList}
      <PurchaseButton cost={400} type="sound" item_id={2} details={selected} />
    </>
  );
};

export default Sounds;
