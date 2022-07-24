import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import PurchaseButton from "./PurchaseButton";

const axios = require("axios");

const Memes = () => {
  const [memes, setMemes] = useState([]);
  const [selected, setSelected] = useState("");
  const [isError, setIsError] = useState(false);
  // const [memes, setMemes] = useState([]);

  async function getMemes() {
    setIsError(false);
    const num = Math.floor(Math.random() * 50);
    try {
      const response = await axios.get("https://api.giphy.com/v1/gifs/search", {
        params: {
          api_key: "IqzbfR9SrMYQLpCVsHtPdxpyG8XBJsim",
          q: "memes",
          offset: num,
          limit: 15,
        },
      });
      setMemes(response.data.data);
    } catch (error) {
      console.error(error);
      setIsError(true);
    }
  }

  useEffect(() => {
    getMemes();
  }, []);

  const handleClick = e => {
    setSelected(e.target.id);
    console.log(selected);
  };

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

  const memesList = memes.map(meme => (
    <div key={meme.embed_url} style={{ width: "33%" }}>
      <iframe
        src={meme.embed_url}
        width="400"
        height="298"
        frameBorder="0"
        className="giphy-embed"
        allowFullScreen
      ></iframe>
      <Button id={meme.embed_url} onClick={handleClick} variant="square">
        Select
      </Button>
    </div>
  ));

  return (
    <div
      style={{
        backgroundColor: "#E0D4FF",
        overflowY: "scroll",
        height: "500px",
        bottom: "6%",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        width: "90%",
        marginLeft: "3%",
      }}
    >
      {isError && <h3>Error</h3>}
      {memesList}
      <PurchaseButton cost={200} purchase={purchase} />
    </div>
  );
};

export default Memes;
