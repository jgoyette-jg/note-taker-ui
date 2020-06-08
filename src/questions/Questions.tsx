import React, {useState} from 'react';
import {Button, Card, CardActionArea, CardActions, CardContent, Fab, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useHistory} from "react-router-dom";
import CategoryChips from "../categories/CategoryChips";
import {Category} from "../categories/Categories";
import AddIcon from '@material-ui/icons/Add';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import {useModal} from "../util/ModalContext";
import {Field, Form, Formik} from "formik";
import * as yup from 'yup';
import {TextField} from "formik-material-ui";

const useStyles = makeStyles((theme) => ({
    media: {
        height: 140,
    },
    fab: {
        position: "fixed",
    },
    buttonAtEnd: {
        display: 'flex',
        alignSelf: 'center',
    },
}));

interface Question {
    id: number,
    question: string,
    answer: string,
    categories: Category[],
    showAnswer: boolean
}

interface Values {
    question: string,
    answer: string
}

const questionFormSchema = yup.object().shape({
    question: yup.string().required('This field is required.'),
    answer: yup.string().required('This field is required.')
});

export const Questions = () => {
    const classes = useStyles();
    const history = useHistory();

    const cannedData = [
        {
            id: 1, question: 'What is your name', answer: 'Arthur', categories: [
                {
                    id: 1,
                    name: 'Spring',
                }
            ],
            showAnswer: false
        },
        {
            id: 2, question: 'What is your favorite color', answer: 'Blue', categories: [
                {
                    id: 1,
                    name: 'Spring',
                }
            ],
            showAnswer: false
        },
        {
            id: 3,
            question: 'What is the airspeed velocity of an unladen swallow',
            answer: 'An african or european swallow?',
            categories: [
                {
                    id: 1,
                    name: 'Spring',
                }
            ],
            showAnswer: false
        },
        {
            id: 4,
            question: 'What is this?',
            answer: 'A question',
            categories: [
                {
                    id: 1,
                    name: 'Spring',
                }
            ],
            showAnswer: false
        },
        {
            id: 5,
            question: 'Is this the last one?',
            answer: 'A question',
            categories: [
                {
                    id: 1,
                    name: 'Spring',
                }
            ],
            showAnswer: false
        },
    ];

    const [questions, setQuestions] = useState(cannedData);
    const {open, close, state} = useModal();
    const isOpen = state.open;

    const buildCard = (question: Question, index: number) => {
        return (
            <Card>
                <CardActionArea onClick={() => {
                    history.push(`/questions/${question.id}`)
                }}>
                    <CardContent>
                        <Typography variant="h5">
                            {question.question}
                        </Typography>
                        <Typography gutterBottom variant="body2" color="textSecondary">
                            {question.showAnswer ? question.answer : '***********'}
                        </Typography>
                        <Typography  variant="h6">
                            Categories
                        </Typography>
                        <CategoryChips categories={question.categories}/>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary" onClick={() => {
                        const newQuestion = {
                            id: question.id,
                            question: question.question,
                            answer: question.answer,
                            categories: question.categories,
                            showAnswer: !question.showAnswer
                        };
                        const newQuestions = [
                            ...questions.slice(0, index),
                            newQuestion,
                            ...questions.slice(index+1, questions.length)
                        ];
                        setQuestions(newQuestions);
                    }}>
                        Answer
                    </Button>
                </CardActions>
            </Card>
        )
    };

    // @ts-ignore
    return (
        <Grid container spacing={3} >
            <Dialog open={isOpen} onClose={close} aria-labelledby="form-dialog-title">
                <Formik
                    initialValues={{
                        question: '',
                        answer: '',
                    }}
                    validationSchema={questionFormSchema}
                    validateOnChange
                    validateOnBlur
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            setSubmitting(false);
                            alert(JSON.stringify(values, null, 2));
                        }, 500);
                    }}
                >
                <Form>
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We will send updates
                        occasionally.
                    </DialogContentText>

                    <Field
                        component={TextField}
                        name="question"
                        label="Question"
                        required
                    />
                    <br />
                    <Field
                        component={TextField}
                        label="Answer"
                        name="answer"
                        required
                    />
                    <br />
                </DialogContent>
                <DialogActions>
                    <Button onClick={close} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={close} color="primary">
                        Subscribe
                    </Button>
                </DialogActions>
                </Form>
            </Formik>
            </Dialog>
            <Grid container item xs={12} justify="space-between">
                <Grid item xs={12} md={6}>
                    <Typography variant="h2" gutterBottom display="inline">Questions</Typography>
                </Grid>
                <Grid item xs={12} md={6} className={classes.buttonAtEnd} direction="row-reverse">
                    <Fab aria-label="Add question" className={classes.fab} color="primary" onClick={open}>
                        <AddIcon/>
                    </Fab>
                </Grid>
            </Grid>
            {questions.map((question, index) => {
                return (
                    <Grid item xs={12} lg={3}>
                        {buildCard(question, index)}
                    </Grid>
                );
            })}
        </Grid>
    )
}