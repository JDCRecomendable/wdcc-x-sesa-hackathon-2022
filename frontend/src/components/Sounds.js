import React, { useState } from "react";
import IconButton from "@mui/material/Button";

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
    </>
  );
};

export default Sounds;
