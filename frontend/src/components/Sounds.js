import React, { useState } from "react";
import Button from "@mui/material/Button";

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
    </>
  );
};

export default Sounds;
