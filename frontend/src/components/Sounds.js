import React, { useState } from "react";
<<<<<<< HEAD
import Button from "@mui/material/Button";
import PurchaseButton from "./PurchaseButton";
=======
import IconButton from "@mui/material/Button";
>>>>>>> c8b0a1e8e8f122a7ccebf354e1da43d32253cd07

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
    <IconButton style= {{marginRight: '20px', color: '#371B58', font: 'fantasy' }} id={option} key={option} onClick={handleClick}>
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
