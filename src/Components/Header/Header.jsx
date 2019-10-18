import React from "react";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  grow: {
    flexGrow: 1,
    textAlign: 'start'
  },
  appBar: {
    background: 'navy'
  }
});

export default () => {
  const classes = useStyles();

  const name = "Jeffrey's";
  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" color="inherit" className={classes.grow}>
          {name} React Graph
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
