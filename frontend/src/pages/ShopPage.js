import React from "react";
import { useState, useEffect } from "react";
import Memes from "../components/Memes";
import Scares from "../components/Scares";
import Cursors from "../components/Cursors";
import Sounds from "../components/Sounds";

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
      ></div>

      <button
        id="memes"
        onClick={handleClick}
        style={{
          position: "fixed",
          width: "15%",
          height: "8%",
          zIndex: "1",
          backgroundColor: "#371B58",
          overflowX: "hidden",
          marginTop: "1%",
          marginLeft: "24%",
          borderRadius: "15px",
          color: "#fff",
          fontSize: "40px",
          font: "Georgia",
          textAlign: "center",
        }}
      >
        Memes
      </button>

      <button
        id="sounds"
        onClick={handleClick}
        style={{
          position: "fixed",
          width: "15%",
          height: "8%",
          zIndex: "1",
          backgroundColor: "#371B58",
          overflowX: "hidden",
          marginTop: "1%",
          marginLeft: "42%",
          borderRadius: "15px",
          color: "#fff",
          fontSize: "40px",
          font: "Georgia",
          textAlign: "center",
        }}
      >
        Sounds
      </button>

      <button
        id="cursors"
        onClick={handleClick}
        style={{
          position: "fixed",
          width: "15%",
          height: "8%",
          zIndex: "1",
          backgroundColor: "#371B58",
          overflowX: "hidden",
          marginTop: "1%",
          marginLeft: "60%",
          borderRadius: "15px",
          color: "#fff",
          fontSize: "40px",
          font: "Georgia",
          textAlign: "center",
        }}
      >
        Cursor
      </button>

      <button
        id="scares"
        onClick={handleClick}
        style={{
          position: "fixed",
          width: "15%",
          height: "8%",
          zIndex: "1",
          backgroundColor: "#371B58",
          overflowX: "hidden",
          marginTop: "1%",
          marginLeft: "78%",
          borderRadius: "15px",
          color: "#fff",
          fontSize: "40px",
          font: "Georgia",
          textAlign: "center",
        }}
      >
        Scare
      </button>

      <div
        style={{
          position: "fixed",
          width: "10%",
          height: "8%",
          zIndex: "1",
          backgroundColor: "#371B58",
          overflowX: "hidden",
          marginLeft: "88%",
          borderRadius: "50px",
          bottom: "5%",
          color: "#fff",
          fontSize: "40px",
          font: "Georgia",
          textAlign: "center",
        }}
      >
        $1000
      </div>
      <div style={{ marginTop: "10%", marginLeft: "20%" }}>{mainPage}</div>
    </>
  );
};

export default ShopPage;
