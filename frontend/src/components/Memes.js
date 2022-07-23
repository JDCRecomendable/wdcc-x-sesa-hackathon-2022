import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";

const axios = require("axios");

const Memes = () => {
  const [memes, setMemes] = useState([]);
  const [selected, setSelected] = useState("");

  async function getMemes() {
    try {
      const response = await axios.get(
        "http://api.giphy.com/v1/gifs/search?q=memes&api_key=g8og2VjrkNrDviAgwZup2BUHZV3NzabW&limit=9"
      );
      setMemes(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getMemes();
  }, []);

  const handleClick = e => {
    setSelected(e.target.id);
    console.log(selected);
  };

  const memesList = memes.map(meme => (
    <div key={meme.embed_url}>
      <Button id={meme.embed_url} onClick={handleClick} variant="outlined">
        Double click to purchase
      </Button>
      <iframe
        src={meme.embed_url}
        width="480"
        height="298"
        frameBorder="0"
        className="giphy-embed"
        allowFullScreen
      ></iframe>
    </div>
  ));

  return (
    <div>
      <h1>Memes</h1>
      {memesList}
    </div>
  );
};

export default Memes;
