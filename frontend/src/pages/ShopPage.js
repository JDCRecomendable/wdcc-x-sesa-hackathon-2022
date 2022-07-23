import Grid from '@mui/material/Grid'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';


const Attack = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(15),
  textAlign: 'center',
  margin: '8px',
  marginLeft: '20px',
  color: theme.palette.text.secondary,
}));

const Target = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(5),
  textAlign: 'center',
  marginBottom: '15px',
  marginTop: '50px',
  color: theme.palette.text.secondary,
}));

const ShopPage = () => {
  return (
    <div style={{backgroundColor: '#E0D4FF', paddingBottom: '300px'}}>
    ,
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>

        {/* This is for selecting individuals */}
        <Grid container spacing={1} item xs={3} justifyContent="space-around">
          <React.Fragment>
            <Grid item xs={8}>
              <Target>Random</Target>
            </Grid>
            <Grid item xs={8}>
              <Target>Individual</Target>
            </Grid>
            <Grid item xs={8}>
              <Target>Room</Target>
            </Grid>
          </React.Fragment>
        </Grid>

        {/* This is for selecting attacks*/}
        <Grid container spacing={1} item xs={9}>          
          <React.Fragment>
          <Grid item xs={5}>
            <Attack>Uno</Attack>
          </Grid>
          <Grid item xs={5}>
            <Attack>Dos</Attack>
          </Grid>
          <Grid item xs={5}>
            <Attack>Tres</Attack>
          </Grid>
          <Grid item xs={5}>
            <Attack>Quatros</Attack>
          </Grid>
        </React.Fragment></Grid>
      </Grid>
    </Box>
    </div>
  );
};

export default ShopPage;
