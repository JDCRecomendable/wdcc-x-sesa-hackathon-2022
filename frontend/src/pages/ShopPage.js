import React from "react";
import { useState, useEffect } from "react";
import Memes from "../components/Memes";
import Scares from "../components/Scares";
import Cursors from "../components/Cursors";
import Sounds from "../components/Sounds";
import { IconButton } from "@mui/material";

const ShopPage = () => {
  const [page, setPage] = useState("blank");
  const [mainPage, setMainPage] = useState(<></>);

  const handleClick = e => {
    setPage(e.target.id);
  };

  useEffect(() => {
    if (page === "memes") {
      setMainPage(<Memes />);
    } else if (page === "scares") {
      setMainPage(<Scares />);
    } else if (page === "cursors") {
      setMainPage(<Cursors />);
    } else if (page === "sounds") {
      setMainPage(<Sounds />);
    } else {
      setMainPage(<></>);
    }
    console.log(page, mainPage);
  }, [page]);

  return (
    <>
      <div
        style={{
          position: "fixed",
          width: "18%",
          height: "100%",
          zIndex: "1",
          top: "3.4em",
          backgroundColor: "#E0D4FF",
          overflowX: "hidden",
          marginTop: "18px",
        }}
      >
        <table>
          <tr>
            <IconButton style={{ marginTop: '150px', color: '#371B58'}}>Random</IconButton>
          </tr>
          <tr>
            <IconButton style={{ marginTop: '150px', color: '#371B58' }}>Individual</IconButton>
          </tr>
          <tr>
            <IconButton style={{ marginTop: '150px', color: '#371B58' }}>Group</IconButton>
          </tr>
        </table>
      </div>

      <IconButton
        id="memes"
        onClick={handleClick}
        style={{
          position: "fixed",
          width: "15%",
          height: "8%",
          backgroundColor: "#371B58",
          marginTop: "6%",
          marginLeft: "24%",
          borderRadius: "15px",
          color: "#fff",
          fontSize: "35px",
          font: "Georgia",
          textAlign: "center",
        }}
      >
        Memes
      </IconButton>

      <IconButton
        id="sounds"
        onClick={handleClick}
        style={{
          position: "fixed",
          width: "15%",
          height: "8%",
          backgroundColor: "#371B58",
          marginTop: "6%",
          marginLeft: "42%",
          borderRadius: "15px",
          color: "#fff",
          fontSize: "35px",
          font: "Georgia",
          textAlign: "center",
        }}
      >
        Sounds
      </IconButton>

      <IconButton
        id="cursors"
        onClick={handleClick}
        style={{
          position: "fixed",
          width: "15%",
          height: "8%",
          backgroundColor: "#371B58",
          marginTop: "6%",
          marginLeft: "60%",
          borderRadius: "15px",
          color: "#fff",
          fontSize: "35px",
          font: "Georgia",
          textAlign: "center",
        }}
      >
        Party
      </IconButton>

      <IconButton
        id="scares"
        on
        onClick={handleClick}
        style={{
          position: "fixed",
          width: "15%",
          height: "8%",
          backgroundColor: "#371B58",
          marginTop: "6%",
          marginLeft: "78%",
          borderRadius: "15px",
          color: "#fff",
          fontSize: "35px",
          font: "Georgia",
          textAlign: "center",
        }}
      >
        Scare
      </IconButton>

      {/* <div
        style={{
          marginTop: "10%",
          marginLeft: "20%",
          maxHeight: "60vh",
          backgroundColor: "grey",
        }}
      >
        {mainPage}
      </div> */}
      <div style={{ marginTop: "7%", marginLeft: "20%" }}>{mainPage}</div>
    </>
  );
};

export default ShopPage;
