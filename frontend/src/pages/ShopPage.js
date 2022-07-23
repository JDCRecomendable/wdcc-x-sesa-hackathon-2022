import React from "react";

const ShopPage = () => {
  return (
    <body>
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
        <button style={{ borderRadius: "50%", height: "100px" }}>Random</button>
        <button style={{ borderRadius: "50%", height: "100px" }}>
          Individual
        </button>
        <button style={{ borderRadius: "50%", height: "100px" }}>Room</button>
      </div>

      <div
        style={{
          position: "fixed",
          width: "15%",
          height: "10%",
          zIndex: "1",
          top: "3.4em",
          backgroundColor: "#E0D4FF",
          overflowX: "hidden",
          marginTop: "2%",
          marginLeft: "24%",
          borderRadius: "15px",
        }}
      >
        Memes
      </div>

      <div
        style={{
          position: "fixed",
          width: "15%",
          height: "10%",
          zIndex: "1",
          top: "3.4em",
          backgroundColor: "#E0D4FF",
          overflowX: "hidden",
          marginTop: "2%",
          marginLeft: "42%",
          borderRadius: "15px",
        }}
      >
        Sounds
      </div>

      <div
        style={{
          position: "fixed",
          width: "15%",
          height: "10%",
          zIndex: "1",
          top: "3.4em",
          backgroundColor: "#E0D4FF",
          overflowX: "hidden",
          marginTop: "2%",
          marginLeft: "60%",
          borderRadius: "15px",
        }}
      >
        Cursor
      </div>

      <div
        style={{
          position: "fixed",
          width: "15%",
          height: "10%",
          zIndex: "1",
          top: "3.4em",
          backgroundColor: "#E0D4FF",
          overflowX: "hidden",
          marginTop: "2%",
          marginLeft: "78%",
          borderRadius: "15px",
        }}
      >
        Scare
      </div>

      <div
        style={{
          position: "fixed",
          width: "8%",
          height: "10%",
          zIndex: "1",
          top: "3.4em",
          backgroundColor: "#E0D4FF",
          overflowX: "hidden",
          marginTop: "38%",
          marginLeft: "88%",
          borderRadius: "50px",
        }}
      >
        $1000
      </div>
    </body>
  );
};

export default ShopPage;
