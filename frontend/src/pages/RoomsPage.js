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
          <tr>
            <th>Room Name</th>
            <th>Room ID</th>
          </tr>
          {roomsList}
        </table>
        <div style={{ float: "left" }}>
          <CreateRoom />
          <JoinRoom />
        </div>
      </div>
      <div
        style={{
          position: "fixed",
          width: "20%",
          height: "40%",
          zIndex: "1",
          top: "3.4em",
          backgroundColor: "#E0D4FF",
          overflowX: "hidden",
          marginTop: "50px",
          marginLeft: "30%",
          borderRadius: "30px",
        }}
      ></div>
    </>
  );
};

export default RoomsPage;
