import Grid from '@mui/material/Grid'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(12),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Item1 = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function FormRow() {
  return (
    <React.Fragment>
      <Grid item xs={2}>
        <Item1>Item</Item1>
      </Grid>
      <Grid item xs={5}>
        <Item>Item</Item>
      </Grid>
      <Grid item xs={5}>
        <Item>Item</Item>
      </Grid>
    </React.Fragment>
  );
}

const ShopPage = () => {
  return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1} alignItems= "center"  justifyContent="space-around">
          <Grid container item spacing={3}>
            <FormRow />
          </Grid>
          <Grid container item spacing={3}>
            <FormRow />
          </Grid>
          <Grid container item spacing={3}>
            <FormRow />
          </Grid>
        </Grid>
      </Box>
  
  );
};

export default ShopPage;
