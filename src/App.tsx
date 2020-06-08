import React from 'react';

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import NavBar from "./navigation/NavBar";
import {Categories} from "./categories/Categories";
import {Container} from "@material-ui/core";
import {CategoryDetails} from "./categories/CategoryDetails";
import {Questions} from "./questions/Questions";
import {QuestionDetails} from "./questions/QuestionDetails";
import {ContextConnectedSnackbar} from "./snackbar/ContextConnectedSnackbar";
import {SnackbarProvider} from "./snackbar/SnackbarContext";
import {ModelProvider} from "./util/ModalContext";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

export const App = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Router>
                <NavBar/>
                <main className={classes.content}>
                    <Container>
                        <div className={classes.toolbar}/>
                        <SnackbarProvider>
                            <ContextConnectedSnackbar/>
                            <ModelProvider>
                                <Switch>
                                    <Route exact path='/categories'><Categories/></Route>
                                    <Route path='/categories/:id'><CategoryDetails/></Route>
                                    <Route exact path='/questions'><Questions/></Route>
                                    <Route exact path='/questions/:id'><QuestionDetails/></Route>
                                </Switch>
                            </ModelProvider>
                        </SnackbarProvider>
                    </Container>
                </main>
            </Router>
        </div>
    );
}
