import CreateRoom from "../components/CreateRoom";
import JoinRoom from "../components/JoinRoom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import PeopleList from "../components/PeopleList";
import RoomsList from "../components/RoomsList";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const RoomsPage = () => {
  const blacklistDummyData = ["youtube.com", "facebook.com", "twitter.com"];
  const whitelistDummyData = ["stackoverflow.com", "github.com", "google.com"];

  const whitelisted = whitelistDummyData.map(website => (
    <tr key={website}>
      <td>
        {website}
        <IconButton edge="end" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </td>
    </tr>
  ));

  const blacklisted = blacklistDummyData.map(website => (
    <tr key={website}>
      <td>
        {website}
        <IconButton edge="end" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </td>
    </tr>
  ));

  const [whiteURL, setWhiteURL] = useState("");
  const [blackURL, setBlackURL] = useState("");

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
        <h2 style={{ textAlign: "center" }}>All Rooms</h2>
        <RoomsList />
        <div style={{ float: "left", position: "fixed", bottom: "5%" }}>
          <CreateRoom />
          <JoinRoom />
        </div>
      </div>

      <div
        style={{
          position: "fixed",
          width: "60%",
          height: "10%",

          backgroundColor: "#371B58",
          overflowX: "hidden",
          marginTop: "6%",
          marginLeft: "30%",
          borderRadius: "20px",
          color: "#fff",
          fontSize: "30px",
        }}
      >
        <div
          style={{
            position: "fixed",
            marginRight: "30%",
            marginLeft: "5%",
            textAlign: "center",
          }}
        >
          Room Name:
        </div>
        <div
          style={{
            marginLeft: "50%",
            textAlign: "center",
          }}
        >
          Room ID:
        </div>
      </div>
      <div
        style={{
          position: "fixed",
          width: "35%",
          height: "65%",
          zIndex: "1",
          top: "3.4em",
          backgroundColor: "#371B58",
          overflowX: "hidden",
          marginTop: "10%",
          marginLeft: "23%",
          borderRadius: "10px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#fff",
            fontSize: "30px",
          }}
        >
          Room Members
        </h2>
        <PeopleList />
      </div>

      {/* Implementation of Whitelist tab */}
      <div
        style={{
          position: "fixed",
          width: "35%",
          height: "21%",
          backgroundColor: "#371B58",
          overflowX: "hidden",
          bottom: "51%",
          marginLeft: "61.5%",
          borderRadius: "5px",
        }}
      >
        {/* Heading */}
        <h2 style={{ textAlign: "center", color: "#fff" }}>
          Whitelisted Websites
        </h2>

        {/* Whitelist items */}
        <table
          style={{
            textAlign: "center",
            marginLeft: "auto",
            marginRight: "auto",
            color: "#fff",
            marginBottom: "15px",
          }}
        >
          <thead>
            <tr>
              <th>Website</th>
            </tr>
          </thead>
          <tbody>{whitelisted}</tbody>
        </table>
      </div>

      {/* Adding new items to whitelist */}
      <div
        style={{
          backgroundColor: "#E0D4FF",
          textAlign: "fixed",
          position: "fixed",
          width: "35%",
          height: "9%",
          bottom: "42%",
          marginLeft: "61.5%",
          borderRadius: "4px",
        }}
      >
        <div style={{ marginRight: "23%" }}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Enter a URL"
            fullWidth
            variant="standard"
            onChange={e => setWhiteURL(e.target.value)}
            value={whiteURL}
          />
        </div>

        {/* Button implementation for whitelist */}
        <Button
          style={{ marginLeft: "78%", marginRight: "9%", bottom: "85%" }}
          variant="outlined"
          onClick={() => setWhiteURL("")}
        >
          Add to whitelist
        </Button>
      </div>

      {/* Implementation of Blacklist tab */}
      <div
        style={{
          position: "fixed",
          width: "35%",
          height: "21%",
          bottom: "15%",
          backgroundColor: "#371B58",
          overflowX: "hidden",
          marginLeft: "61.5%",
          borderRadius: "4px",
        }}
      >
        {/* Heading */}
        <h2 style={{ color: "#fff", textAlign: "center" }}>
          Blacklisted Websites
        </h2>

        {/* Blacklist items */}
        <table
          style={{
            textAlign: "center",
            marginLeft: "auto",
            marginRight: "auto",
            color: "#fff",
            marginBottom: "15px",
          }}
        >
          <thead>
            <tr>
              <th>Website</th>
            </tr>
          </thead>
          <tbody>{blacklisted}</tbody>
        </table>
      </div>

      {/* Adding new items to blacklist */}
      <div
        style={{
          backgroundColor: "#E0D4FF",
          bottom: "6%",
          textAlign: "fixed",
          position: "fixed",
          width: "35%",
          height: "9%",
          marginLeft: "61.5%",
          borderRadius: "4px",
        }}
      >
        {/* Enter URL implementation */}
        <div style={{ marginRight: "23%" }}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Enter a URL"
            fullWidth
            variant="standard"
            onChange={e => setBlackURL(e.target.value)}
            value={blackURL}
          />
        </div>

        {/* Button to save implementation */}
        <Button
          style={{ marginLeft: "78%", bottom: "85%", marginRight: "9%" }}
          variant="outlined"
          onClick={() => blacklistDummyData.push(blackURL)}
        >
          Add to blacklist
        </Button>
      </div>
    </>
  );
};

export default RoomsPage;
