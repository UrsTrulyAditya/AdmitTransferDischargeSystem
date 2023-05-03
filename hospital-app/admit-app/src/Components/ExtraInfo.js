import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Header from './Header';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        maxWidth: 800,
        margin: 'auto',
        marginBottom: 20,
    },
    media: {
        width: '40%',
        minWidth: 200,
    },
    content: {
        width: '60%',
        padding: 20,
    },
    title: {
        marginBottom: 10,
    },
});

const ExtraInfo = ({id}) => {
    const classes = useStyles();
    console.log(id,'aaaaa');
    return (
        <>
            <Header/>
            <Card className={classes.root}>
                <CardMedia
                    className={classes.media}
                    component="img"
                    alt="Image description"
                    image="https://example.com/image.jpg"
                />
                <CardContent className={classes.content}>
                    <Typography variant="h5" component="h2" className={classes.title}>
                        Title
                    </Typography>
                    <Typography variant="body1" color="textSecondary" component="p">
                        Some information about the image goes here.
                    </Typography>
                    <Typography variant="body1" component="p">
                        Some additional information can go here.
                    </Typography>
                </CardContent>
            </Card>
        </>
    );
};

export default ExtraInfo;
