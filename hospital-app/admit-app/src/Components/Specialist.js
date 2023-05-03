import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        overflowX: 'auto',
        padding: theme.spacing(2),
        position: 'relative', // add this
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(1),
        },
    },

    card: {
        width: 180,
        margin: theme.spacing(1),
        padding: '25px',
        borderRadius: '10%',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        transition: 'transform 0.2s',
        '&:hover': {
            transform: 'scale(1.05)',
            cursor: 'pointer',
        },
    },
    media: {
        height: 120,
        borderRadius: '50%',
    },
    arrow: {
        fontSize: 30,
        color: '#777777',
        transition: 'transform 0.2s',
        '&:hover': {
            transform: 'scale(1.1)',
            cursor: 'pointer',
        },
    },
}));

const specialists = [{ id: 1, name: 'Cardiologist', image: 'https://picsum.photos/id/10/200/200' }, { id: 2, name: 'Dermatologist', image: 'https://picsum.photos/id/20/200/200' }, { id: 3, name: 'Endocrinologist', image: 'https://picsum.photos/id/30/200/200' }, { id: 4, name: 'Gynecologist', image: 'https://picsum.photos/id/40/200/200' }, { id: 5, name: 'Neurologist', image: 'https://picsum.photos/id/50/200/200' }, { id: 6, name: 'Oncologist', image: 'https://picsum.photos/id/60/200/200' }, { id: 7, name: 'Ophthalmologist', image: 'https://picsum.photos/id/70/200/200' }, { id: 8, name: 'Orthopedist', image: 'https://picsum.photos/id/80/200/200' }, { id: 9, name: 'Pediatrician', image: 'https://picsum.photos/id/90/200/200' }, { id: 10, name: 'Psychiatrist', image: 'https://picsum.photos/id/100/200/200' },];

const SpecialistCarousel = () => {
    const classes = useStyles();
    const [scrollX, setScrollX] = React.useState(0);

    const handleArrowClick = (direction) => {
        const container = document.getElementById('carousel-container');
        const scrollStep = container.clientWidth; // use container width as scroll step
        if (direction === 'left') {
            const newScrollX = Math.max(scrollX - scrollStep, 0); // handle edge case
            setScrollX(newScrollX);
            container.scrollLeft = newScrollX;
        } else {
            const newScrollX = Math.min(scrollX + scrollStep, container.scrollWidth - container.clientWidth); // handle edge case
            setScrollX(newScrollX);
            container.scrollLeft = newScrollX;
        }
    };


    const handleClick = (id) => {
        // handle click on specialist card, e.g. redirect to specialist route
        console.log("Clicked");
    };

    return (
        <div className={classes.root} id="carousel-container">
            {scrollX > 0 && (
                <ArrowBackIosIcon className={classes.arrow} onClick={() => handleArrowClick('left')} />
            )}
            {scrollX < (document.getElementById('carousel-container')?.scrollWidth - document.getElementById('carousel-container')?.clientWidth) && (
                <ArrowForwardIosIcon className={classes.arrow} onClick={() => handleArrowClick('right')} />
            )}

            {specialists.map((specialist) => (
                <Card className={classes.card} key={specialist.id} onClick={() => handleClick(specialist.id)}>
                    <CardActionArea>
                        <CardMedia className={classes.media} image={specialist.image} />
                        <CardContent>
                            <Typography variant="h6" align="center">
                                {specialist.name}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            ))}
            {scrollX < 400 && (
                <ArrowForwardIosIcon className={classes.arrow} onClick={() => handleArrowClick('right')} />
            )}
        </div>
    );
};

export default SpecialistCarousel;
