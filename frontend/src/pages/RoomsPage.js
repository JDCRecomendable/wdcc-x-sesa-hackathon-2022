import Grid from '@mui/material/Grid'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const EditRoom = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(12),
  textAlign: 'center',
  margin: '10px',
  marginLeft: '20px',
  marginBottom: '20px',
  backgroundColor: '#371B58',
  color: '#fff',
  fontSize: '40px',
  font: 'Georgia', 
  borderRadius: '50px',
}));

const ViewRoom = styled(Paper)(({ theme }) => ({
  backgroundColor: "#371B58",
  margin: '10px',
  color: '#fff',
  padding: theme.spacing(30),
  textAlign: 'center',
  font: 'Georgia',
  fontSize: '40px',
  borderRadius: '50px',
}));



const RoomsPage = () => {
  return (
    <div style={{backgroundColor: '#E0D4FF', paddingBottom: '75px'}}>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
      <Grid container spacing={1} item xs={6} justifyContent="space-around" marginTop='50px'>
          <React.Fragment>
            <Grid item xs= {11.5}>
              <EditRoom>Create</EditRoom>
            </Grid>
            <Grid item xs={11.5}>
              <EditRoom>Join</EditRoom>
            </Grid>
          </React.Fragment>
        </Grid>
        <Grid container spacing={1} item xs={6} justifyContent="space-around" marginTop='50px'>
          <React.Fragment>
          <Grid item xs={11.5}>
            <ViewRoom>View Room</ViewRoom>
          </Grid>
            </React.Fragment>
          </Grid>
      </Grid>
      </Box>
    </div>
  );
};

export default RoomsPage;
