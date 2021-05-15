import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

// import {
//   Budget,
//   TotalUsers,
//   TasksProgress,
//   TotalProfit,
//   LatestSales,
//   UsersByDevice,
//   LatestProducts
// } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          Dashboard
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
