import React from "react";
import {Grid, Typography} from "@material-ui/core";
import { Link as RouterLink} from 'react-router-dom';
import Link from '@material-ui/core/Link';

export const CategoryDetails = ({match}: any) => {

    const categoryDetails = {
        id: 1,
        name: 'Spring',
        pageUrl: 'https://spring.io/',
        docsUrl: 'https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/',
        image: 'https://docs.spring.io/spring/docs/4.3.x/spring-framework-reference/html/images/spring-overview.png',
        description: 'The Spring Framework is an application framework and inversion of control container for the Java platform. ' +
            'The framework\'s core features can be used by any Java application, but there are extensions for building web applications on top of the Java EE (Enterprise Edition) platform. ' +
            'Although the framework does not impose any specific programming model, it has become popular in the Java community as an addition to, or even replacement for the Enterprise JavaBeans (EJB) model. ' +
            'The Spring Framework is open source.'
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h6">
                    <Link component={RouterLink} to="/categories">
                        Back to categories
                    </Link>
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h2" gutterBottom>{categoryDetails.name}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h6">Home page: </Typography>
                <Typography variant="body1"><a href={categoryDetails.pageUrl}>{categoryDetails.pageUrl}</a></Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h6">Docs page: </Typography>
                <Typography variant="body1"><a href={categoryDetails.docsUrl}>{categoryDetails.docsUrl}</a></Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h6">Description: </Typography>
                <Typography variant="body1">{categoryDetails.description}</Typography>
            </Grid>
        </Grid>
    )
}