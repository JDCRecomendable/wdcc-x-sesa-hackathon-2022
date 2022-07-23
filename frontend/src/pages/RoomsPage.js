import CreateRoom from "../components/CreateRoom";
import JoinRoom from "../components/JoinRoom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import PeopleList from "../components/PeopleList";
import RoomsList from "../components/RoomsList";
import { fontSize } from "@mui/system";

const RoomsPage = () => {
  const blacklistDummyData = ["youtube.com", "facebook.com", "twitter.com"];
  const whitelistDummyData = ["stackoverflow.com", "github.com", "google.com"];

  const whitelisted = whitelistDummyData.map(website => (
    <tr key={website}>
      <td>{website}</td>
    </tr>
  ));

  const blacklisted = blacklistDummyData.map(website => (
    <tr key={website}>
      <td>{website}</td>
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
        <h2 style={{ textAlign: 'center' }}>All Rooms</h2>
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
          marginTop: "1.5%",
          marginLeft: "30%",
          borderRadius: "20px",
          color: '#fff',
          fontSize: '30px',
        }}
      >
        <div style={{
          position: "fixed",
          marginRight: "30%",
          marginLeft: "5%",
          textAlign: "center",
        }}
        >Room Name:</div>
        <div style={{
          marginLeft: "50%",
          textAlign: "center",
        }}>Room ID:</div>
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
        <h2 style={{
          textAlign: 'center',
          color: '#fff',
          fontSize: '30px',
        }}>
          Room Members</h2>
        <PeopleList />
      </div>
      <div
        style={{
          position: "fixed",
          width: "35%",
          height: "30%",
          zIndex: "1",
          top: "3.4em",
          backgroundColor: "#371B58",
          overflowX: "hidden",
          marginTop: "10%",
          marginLeft: "61.5%",
          borderRadius: "10px",
        }}
      >
        <h2 style={{ textAlign: 'center', color: '#fff' }}>Whitelisted Websites</h2>

        <table style={{ textAlign: 'center', marginLeft: 'auto', marginRight: 'auto', color: '#fff', marginBottom: '15px' }}>
          <thead>
            <tr>
              <th>Website</th>
            </tr>
          </thead>
          <tbody>{whitelisted}</tbody>
        </table>


        <div style={{
          backgroundColor: '#E0D4FF',
          bottom: '0px',
          textAlign: 'fixed',
        }}>
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
          <Button variant="outlined" onClick={() => setWhiteURL("")}>
            Add to whitelist
          </Button>
        </div>
      </div>
      <div
        style={{
          position: "fixed",
          width: "35%",
          height: "30%",
          zIndex: "1",
          top: "3.4em",
          backgroundColor: "#371B58",
          overflowX: "hidden",
          marginTop: "27%",
          marginLeft: "61.5%",
          borderRadius: "10px",
        }}
      >
        <h2 style={{ color: '#fff', textAlign: 'center' }}>Blacklisted Websites</h2>
        <table style={{ textAlign: 'center', marginLeft: 'auto', marginRight: 'auto', color: '#fff', marginBottom: '15px' }}>
          <thead>
            <tr>
              <th>Website</th>
            </tr>
          </thead>
          <tbody>{blacklisted}</tbody>
        </table>
        <div style={{
          backgroundColor: '#E0D4FF',
          bottom: '0px',
          textAlign: 'fixed',
        }}>
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
          <Button variant="outlined" onClick={() => setWhiteURL("")}>
            Add to blacklist
          </Button>
        </div>
      </div>
    </>
  );
};

export default RoomsPage;
