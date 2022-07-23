import React, { useState } from "react";

const axios = require("axios");

const Memes = () => {
  const [memes, setMemes] = useState([]);

  async function getMemes() {
    try {
      const response = await axios.get(
        "http://api.giphy.com/v1/gifs/search?q=memes&api_key=g8og2VjrkNrDviAgwZup2BUHZV3NzabW&limit=9"
      );
      console.log(response.data.data);
      setMemes(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  getMemes();

  const memesList = memes.map(meme => (
    <div key={meme}>
      <iframe
        src={meme.embed_url}
        width="480"
        height="298"
        frameBorder="0"
        class="giphy-embed"
        allowFullScreen
      ></iframe>
      <p>
        <a href={meme.url}>via GIPHY</a>
      </p>
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
