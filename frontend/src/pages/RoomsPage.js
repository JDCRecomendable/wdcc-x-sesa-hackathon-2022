import CreateRoom from "../components/CreateRoom";
import JoinRoom from "../components/JoinRoom";

const RoomsPage = () => {
  const roomDummyData = [
    { _id: 252523, name: "Cool room" },
    { _id: 993541, name: "Another room" },
    { _id: 342345, name: "Room X" },
  ];

  const blacklistDummyData = ["youtube.com", "facebook.com", "twitter.com"];
  const whitelistDummyData = ["stackoverflow.com", "github.com", "google.com"];

  const roomsList = roomDummyData.map(room => (
    <tr key={room.id}>
      <td>{room.name}</td>
      <td>{room._id}</td>
    </tr>
  ));

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
        Table
        <table>
          <thead>
            <tr>
              <th>Room Name</th>
              <th>Room ID</th>
            </tr>
          </thead>
          <tbody>{roomsList}</tbody>
        </table>
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
          zIndex: "1",
          top: "3.4em",
          backgroundColor: "#E0D4FF",
          overflowX: "hidden",
          marginTop: "40px",
          marginLeft: "30%",
          borderRadius: "20px",
        }}
      >
        RoomName/RoomID
      </div>
      <div
        style={{
          position: "fixed",
          width: "35%",
          height: "65%",
          zIndex: "1",
          top: "3.4em",
          backgroundColor: "#E0D4FF",
          overflowX: "hidden",
          marginTop: "10%",
          marginLeft: "23%",
          borderRadius: "10px",
        }}
      >
        List of peeps
      </div>
      <div
        style={{
          position: "fixed",
          width: "35%",
          height: "30%",
          zIndex: "1",
          top: "3.4em",
          backgroundColor: "#E0D4FF",
          overflowX: "hidden",
          marginTop: "10%",
          marginLeft: "61.5%",
          borderRadius: "10px",
        }}
      >
        <h2>Whitelisted Websites</h2>

        <table>
          <thead>
            <tr>
              <th>Website</th>
            </tr>
          </thead>
          <tbody>{whitelisted}</tbody>
        </table>
      </div>
      <div
        style={{
          position: "fixed",
          width: "35%",
          height: "30%",
          zIndex: "1",
          top: "3.4em",
          backgroundColor: "#E0D4FF",
          overflowX: "hidden",
          marginTop: "27%",
          marginLeft: "61.5%",
          borderRadius: "10px",
        }}
      >
        <h2>Blacklisted Websites</h2>
        <table>
          <thead>
            <tr>
              <th>Website</th>
            </tr>
          </thead>
          <tbody>{blacklisted}</tbody>
        </table>
      </div>
    </>
  );
};

export default RoomsPage;
