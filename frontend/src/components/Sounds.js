import React, { useState } from "react";
import Button from "@mui/material/Button";
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
    <Button id={option} variant="outlined" key={option} onClick={handleClick}>
      {option}
    </Button>
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
