import * as React from "react";
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";

import Grid from "@mui/material/Grid";

function generate(element) {
  return [0, 1, 2].map(value =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function PeopleList() {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} md={12}>
        <Demo>
          <List>
            {generate(
              <ListItem sx={{ background: "#371B58", color: "#fff" }}>
                <ListItemAvatar>
                  <Avatar>
                    <Avatar sx={{ bgcolor: "red" }}>N</Avatar>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Name" />
              </ListItem>
            )}
          </List>
        </Demo>
      </Grid>
    </Grid>
  );
}
