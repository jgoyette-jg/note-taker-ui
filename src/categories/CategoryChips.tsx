import React from "react";
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'left',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0),
        margin: 0,
    },
    chip: {
        margin: theme.spacing(0.5),
    },
}));


export const CategoryChips = (props:any) => {

    const classes = useStyles();
    const {categories} = props;


    const buildChip = (
        chip: any
    ) => {
        return (
            <Chip
                variant="outlined"
                label={chip.name}
                clickable
                className={classes.chip}
            />
        )
    };

    return (
        <div>
            <ul className={classes.root}>
                {categories.map((data: any, index: number) => {
                    return (
                        <li key={index}>
                            {buildChip(data)}
                        </li>
                    );
                })}
            </ul>

        </div>
    );

}

export default CategoryChips;