import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4),
        // backgroundColor: theme.palette.primary.main,
        // color: theme.palette.primary.contrastText,
        color: "#3d7ba2",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagesContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    image: {
        height: '125px',
        margin: theme.spacing(1),
    },
    image2: {
        height: '190px',
        margin: theme.spacing(1),
    },
    title: {
        marginBottom: theme.spacing(2),
        color: "#3d7ba2",
        fontSize: '20px'
    },
    subtitle: {
        // fontWeight: 'bold',
        color: "#737373",
        fontSize: '14px'


    },
}));

const Excellence = () => {
    const classes = useStyles();

    return (
        <>
            <div className={classes.root} style={{ marginTop: '85px', backgroundColor: '#ffffff' }}>
                <Typography variant="h4" align="center" style={{ marginBottom: '20px', color: '#000000' }}>
                    <b>Clinical Excellence</b>
                </Typography>
                <Grid container spacing={2} style={{ marginTop: '25px', }}>
                    <Grid item xs={12} md={4} style={{ textAlign: 'center' }}>
                        <img className={classes.image2} src="https://www.narayanahealth.org/sites/default/files/styles/clinical_excellence__310_x_188_/public/medical-specialities-min.jpg?itok=ttSBPRhL" alt="image1" />
                        <Typography variant="h5" className={classes.title} align="center">
                            State-of-the-Art Facilities
                        </Typography>
                        <Typography className={classes.subtitle} variant="body1" align="center">
                            Discover Why Our HealthSure is the Best Choice
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4} style={{ textAlign: 'center' }}>
                        <img className={classes.image2} src="https://www.narayanahealth.org/sites/default/files/styles/clinical_excellence__310_x_188_/public/medical-procedures-min.jpg?itok=Tg8bfhFA" alt="image2" />

                        <Typography variant="h5" className={classes.title} align="center">
                            Top-Notch Equipment and Technology
                        </Typography>
                        <Typography className={classes.subtitle} variant="body1" align="center">

                            Discover Why Our HealthSure is the Best
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4} style={{ textAlign: 'center' }}>
                        <img style={{ height: '155px', marginTop: '33px' }} className={classes.image2} src="https://res.cloudinary.com/daari0y7l/image/upload/v1682535097/kisspng-ambulance-car-paramedic-emergency-fire-engine-ambulance-5a6d76f8b88219.5665672015171233207558_xybpzl.png" alt="image3" />

                        <Typography variant="h5" className={classes.title} align="center">
                            The Ultimate in Healthcare
                        </Typography>
                        <Typography className={classes.subtitle} variant="body1" align="center">
                            24/7 Ambulance Service
                        </Typography>
                    </Grid>
                </Grid>
            </div>
            <div className={classes.root} style={{ marginTop: '85px', backgroundColor: '#ffffff' }}>
                <Typography variant="h4" align="center" style={{ marginBottom: '20px', color: '#000000' }}>
                    <b>Awards and Accreditations</b>
                </Typography>
                <Typography variant="h6" align="center">
                    HealthSure Hospitals is Frequently Recognised for its Commitment to Providing World-Class Healthcare & Excellent Patient Service
                </Typography>

                <Grid container spacing={2} style={{ marginTop: '25px', }}>
                    <Grid item xs={12} md={4} style={{ textAlign: 'center' }}>
                        <img className={classes.image} src="https://www.narayanahealth.org/sites/default/files/styles/awards__226_x_120_/public/awards/cardi.jpeg?itok=aTBhCPAW" alt="image1" />
                        <Typography variant="h5" className={classes.title} align="center">
                            Excellence in Cardiology 2022
                        </Typography>
                        <Typography className={classes.subtitle} variant="body1" align="center">
                            Excellence in Cardiology, Iconic Multispeciality Hospital of Rajasthan and Excellence in Cardiac Surgery by The Times of India - Rajasthan Health Icons 2022
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4} style={{ textAlign: 'center' }}>
                        <img className={classes.image} src="https://www.narayanahealth.org/sites/default/files/styles/awards__226_x_120_/public/awards/hsda.jpeg?itok=oN9D03Pg" alt="image2" />

                        <Typography variant="h5" className={classes.title} align="center">
                            Healthcare Summit and Doctors's Award 2022
                        </Typography>
                        <Typography className={classes.subtitle} variant="body1" align="center">

                            Best Multispeciality Hospital in Rajasthan at Rajasthan Healthcare Summit and Doctors's Award
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4} style={{ textAlign: 'center' }}>
                        <img className={classes.image} src="https://www.narayanahealth.org/sites/default/files/styles/awards__226_x_120_/public/awards/neuro.jpeg?itok=y4z3NQYX" alt="image3" />

                        <Typography variant="h5" className={classes.title} align="center">
                            Excellence in Neuro Sciences 2022
                        </Typography>
                        <Typography className={classes.subtitle} variant="body1" align="center">

                            Excellence in Neuro Sciences at All India Critical Care Hospital Ranking Survey 2022 by Times Health Survey
                        </Typography>
                    </Grid>
                </Grid>
            </div>

        </>
    );
};

export default Excellence;
