import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import FolderIcon from "@mui/icons-material/Folder";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const roomDummyData = [
  { _id: 252523, name: "Cool room" },
  { _id: 993541, name: "Another room" },
  { _id: 342345, name: "Room X" },
];

function generate(element) {
  return roomDummyData.map(room =>
    React.cloneElement(element, {
      key: room._id,
    })
  );
}

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function RoomsList() {
  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <Demo>
        <List>
          {generate(
            <ListItem
              sx={{ background: "#E0D4FF" }}
              secondaryAction={
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Room name" />
            </ListItem>
          )}
        </List>
      </Demo>
    </Box>
  );
}
