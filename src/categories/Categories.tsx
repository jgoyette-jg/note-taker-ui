import React, {useEffect, useState} from 'react';
import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import { useHistory } from 'react-router-dom';
import BaseRequest from "../util/BaseRequest";

export interface Category {
    id: number,
    name: string
}

interface CategoryDetail extends Category {
    description: string,
    imageUrl: string
}

const useStyles = makeStyles({
    media: {
        height: 140,
    },
});

export const Categories = () => {
    const classes = useStyles();
    const history = useHistory();

    const [categories, setCategories] = useState([]);

    useEffect(
        () => {
            BaseRequest.get('/categories').then(
                (success) => {
                    console.log(success)
                    setCategories(success.data)
                }, error => {
                    console.error(error);
                }
            )
        }, []
    )


    const buildCard = (category: CategoryDetail) => {
        return (
            <Card>
                <CardActionArea onClick={() => {
                    history.push(`/categories/${category.id}`)
                }}>
                    <CardMedia
                        className={classes.media}
                        image={category.imageUrl}
                        title={category.name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5">
                            {category.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {category.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                        Questions
                    </Button>
                    <Button size="small" color="primary">
                        Answers
                    </Button>
                </CardActions>
            </Card>
        )
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h2" gutterBottom>Categories</Typography>
            </Grid>

            {categories.map((category) => {
                return (
                    <Grid item xs={12} lg={3}>
                        {buildCard(category)}
                    </Grid>
                );
            })}
        </Grid>
    );
};