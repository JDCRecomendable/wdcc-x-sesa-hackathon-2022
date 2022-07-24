import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";

const axios = require("axios");



const Memes = () => {
  const [memes, setMemes] = useState([]);
  const [selected, setSelected] = useState("");
  // const [memes, setMemes] = useState([]);

  async function getMemes() {
    const num = Math.floor(Math.random() * 50);
    try {
      const response = await axios.get("https://api.giphy.com/v1/gifs/search", {
        params: {
          api_key: "IqzbfR9SrMYQLpCVsHtPdxpyG8XBJsim",
          q: "memes",
          offset: num,
          limit: 6,
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
    // <div style={{
    //   bottom: "2%",
    //   marginRight: "2%",
    //   backgroundColor: "#371B58",
    //   height: '300px',
    //   width: '80%',
    //   borderRadius: "4px",
    //   overflowY: "scroll",
    // }}>

    //   {/* Blacklist items */}
    //   <table style={{ textAlign: 'center', marginLeft: 'auto', marginRight: 'auto', color: '#fff', marginBottom: '15px' }}>
    //     <thead>
    //       <tr>
    //         <th>Website</th>
    //       </tr>
    //     </thead>
    //     <tbody>{memesList}</tbody>
    //   </table>

    // </div>
    <div>
      {memesList}
    </div>
  );
};

export default Memes;