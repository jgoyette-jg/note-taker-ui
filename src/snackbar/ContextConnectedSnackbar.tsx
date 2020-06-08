import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import {makeStyles} from "@material-ui/core/styles";
import MuiAlert from "@material-ui/lab/Alert";
import {useSnackbar} from "./SnackbarContext";

const useStyles = makeStyles({
    snackBar: {
        paddingLeft: "100px",
        paddingRight: "100px"

    }
});

const Alert = (props: any) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export const ContextConnectedSnackbar = () => {
    const classes = useStyles();
    const {
        state: {type, message, open},
        close
    } = useSnackbar();

    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={() => close()}
            anchorOrigin={{vertical: 'top', horizontal: 'center'}}
        >
            <Alert className={classes.snackBar}
                   onClose={() => close()}
                   severity={type}>
                {message}
            </Alert>
        </Snackbar>);
};