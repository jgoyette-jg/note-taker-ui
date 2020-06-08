import React from "react";
import {Grid, Typography} from "@material-ui/core";
import { Link as RouterLink} from 'react-router-dom';
import Link from '@material-ui/core/Link';

export const QuestionDetails = ({match}: any) => {

    const questionDetails = {
        id: 1,
        question: 'What is your name?',
        answer: 'Arthur',
        references: [
            {
                text: 'Wikipedia',
                url: 'https://en.wikiquote.org/wiki/Monty_Python_and_the_Holy_Grail#Three_questions'
            }
        ]
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h6">
                    <Link component={RouterLink} to="/questions">
                        Back to questions
                    </Link>
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h2">{questionDetails.question}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h5" >Answer: </Typography>
                <Typography variant="body1">{questionDetails.answer}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h6">References: </Typography>
                <Typography variant="body1">
                    <ul>
                        {questionDetails.references.map((reference)=> {
                            return (<li><a href={reference.url}>{reference.text}</a></li>)
                        })}
                    </ul>
                </Typography>
            </Grid>
        </Grid>
    )
}