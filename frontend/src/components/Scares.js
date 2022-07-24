import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import PurchaseButton from "./PurchaseButton";

const axios = require("axios");

const Scares = () => {
  const [memes, setMemes] = useState([]);
  const [selected, setSelected] = useState("");

  async function getMemes() {
    const num = Math.floor(Math.random() * 50);
    try {
      const response = await axios.get("https://api.giphy.com/v1/gifs/search", {
        params: {
          api_key: "IqzbfR9SrMYQLpCVsHtPdxpyG8XBJsim",
          q: "jump scare",
          offset: num,
          limit: 8,
        },
      });
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
        Double click to select
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
      <h1>Scares</h1>
      {memesList}
      <PurchaseButton cost={800} type="scare" item_id={4} details={selected} />
    </div>
  );
};

export default Scares;
