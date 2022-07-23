import CreateRoom from "../components/CreateRoom";
import JoinRoom from "../components/JoinRoom";

const RoomsPage = () => {
  const dummyData = [
    { _id: 252523, name: "Cool room" },
    { _id: 993541, name: "Another room" },
    { _id: 342345, name: "Room X" },
  ];

  const roomsList = dummyData.map(room => (
    <tr>
      <td>{room.name}</td>
      <td>#{room._id}</td>
    </tr>
  ));

  return (
    <>
      {" "}
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
        <button
          sx={{ my: 2, color: "white", display: "block", marginLeft: "20px" }}
        >
          Create
        </button>
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
        Whitelist
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
        Blacklist
      </div>
    </>
  );
};

export default RoomsPage;
