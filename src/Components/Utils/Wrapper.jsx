import React from "react";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
    wrapper: {
        height: '100%',
        display: 'flex',
        flexFlow: 'row wrap',
        padding: '20px',
        justifyContent: 'center',
        alignContent: 'flex-start',
    },
}));

function Wrapper(props) {
    const classes = useStyles(useStyles);

    return <main className={classes.wrapper} {...props} />;
};

export default Wrapper;