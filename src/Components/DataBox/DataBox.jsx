import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles(theme => ({
    // outer style of container
    paper: {
        width: '210px',
        height: '110px',
        margin: '55px 5px 0 5px',
        border: '2px solid navy',
        boxShadow: '0 1px 3px grey'
    },
}));

function DataBox(props) {
    const classes = useStyles(useStyles);

    return (
        <Paper className={classes.paper}  {...props} />
    )
};

export default DataBox;