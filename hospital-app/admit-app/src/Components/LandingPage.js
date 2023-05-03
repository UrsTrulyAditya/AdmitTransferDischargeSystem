import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
    AppBar,
    Button,
    Box,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    Toolbar,
    Typography,
    CircularProgress,
} from "@material-ui/core";
// import { RiAdminFill } from "@react-icons/all-files/fa/FaBeer";
import { BiUser } from "react-icons/bi";
import { FiUserCheck } from "react-icons/fi";
import { FaHospitalUser,FaAccessibleIcon,FaUserShield } from "react-icons/fa";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/core/IconButton";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { makeStyles } from "@material-ui/core/styles";
import { Avatar } from '@material-ui/core';
import { PersonIcon, GroupIcon } from '@material-ui/icons';
import Login from "./Login";
import Header from "./Header";
import Footer from "./Footer";
import CovidVaccineStatusGraph from "./CovidVaccineChart ";
import SpecialistCards from "./Specialist";
import Cards from "./Cards";
import appStore from "../Store/store";
import CarouselComponent from "./CarouselComponent";
import FaqComponent from "./FaqComponent";
import Excellence from "./Excellence";
import HealthNews from "./HealthNews";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: "90%",
        margin: "auto",
        // paddingTop:"20px"

    },
    banner: {
        backgroundImage: "url('https://res.cloudinary.com/daari0y7l/image/upload/v1682262220/20230423_202533_lsh60s.png')",
        backgroundSize: "cover",
        height: "90vh",
        display: "flex",
        margin: "auto",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        marginBottom: "45px",
        borderRadius: "25px",
    },
    card: {
        maxWidth: 345,
        margin: theme.spacing(3),
    },
    icon: {
        fontSize: 100,
        margin: 'auto',
        color: '#3d7ba2'

    }
}));

const LandingPage = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [selectedCard, setselectedCard] = useState("");
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    React.useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');

        }
        setTimeout(() => {
            setLoading(false);
        }, 1100);
        window.scrollTo(0, 0);
    }, []);
    const handleCardClick = (name) => {
        setOpen(true);
        setselectedCard(name);
        setLoginModalOpen(true);
    };


    const handleClose = () => {
        setOpen(false);
    };

    if (loading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <CircularProgress />
            </div>
        );
    }
    return (
        <>
            <Header />
            <div>
                {/* <Cards /> */}
            </div>
            <div className={classes.root} style={{ overflow: 'hidden', scrollBehavior: 'smooth' }}>
                <div style={{ margin: 'auto', textAlign: 'center', width: "80vw", marginBottom: "35px", height: "78vh", backgroundColor: "#ffffff", borderRadius: '25px' }}>
                    <img
                        style={{ width: "85%", height: "78vh" }}
                        src="https://res.cloudinary.com/daari0y7l/image/upload/v1682262220/20230423_202533_lsh60s.png"
                        alt="Banner"
                    />
                </div>

                {/* <div style={{width:'80%'}}>
                    <CovidVaccineStatusGraph />
                </div> */}
                <div style={{ width: '80vw', margin: 'auto', marginTop: '85px' }} >
                    <Grid container spacing={5} >
                        <Grid item xs={12} sm={6} md={4}>

                            <Card className={classes.card} style={{ borderRadius: '15px', height: "155px" }} >
                                <CardActionArea onClick={() => handleCardClick("Admin")}>
                                    <Box textAlign="center">
                                        <IconButton className={classes.iconButton}>
                                            {/* <SupervisorAccountIcon fontSize="large" className={classes.icon} /> */}
                                        </IconButton>
                                    </Box>
                                    <CardContent>
                                        <Typography style={{ fontSize: '30px', color: '#3d7ba2', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center' }} gutterBottom variant="h5" component="h2">
                                            <FaHospitalUser fontSize={90} />
                                            Admin
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                {/* <CardActions>
                                    <Button size="small" color="primary" onClick={() => handleCardClick("Admin")}>
                                        Click to continue <ArrowForwardIosIcon />
                                    </Button>
                                </CardActions> */}
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card className={classes.card} style={{ borderRadius: '15px', height: "155px" }}>
                                <CardActionArea onClick={() => handleCardClick("Patient")}>
                                    <Box textAlign="center">
                                        <IconButton className={classes.iconButton}>
                                            {/* <SupervisorAccountIcon className={classes.icon} /> */}
                                        </IconButton>
                                    </Box>
                                    <CardContent>
                                        <Typography style={{ fontSize: '30px', color: '#3d7ba2', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center' }} gutterBottom variant="h5" component="h2">
                                            <FaAccessibleIcon fontSize={90} />
                                            Patient
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                {/* <CardActions>
                                    <Button size="small" color="primary" onClick={() => { handleCardClick("Patient") }}>
                                        Click to continue <ArrowForwardIosIcon />
                                    </Button>
                                </CardActions> */}
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card className={classes.card} style={{ borderRadius: '15px', height: "155px" }}>
                                <CardActionArea onClick={() => handleCardClick("TPA")}>
                                    <Box textAlign="center">
                                        <IconButton className={classes.iconButton}>
                                            {/* <SupervisorAccountIcon className={classes.icon} /> */}
                                        </IconButton>
                                    </Box>
                                    <CardContent>
                                    <Typography style={{ fontSize: '30px', color: '#3d7ba2', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center' }} gutterBottom variant="h5" component="h2">
                                            <FaUserShield fontSize={90} />
                                            TPA
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                {/* <CardActions>
                                    <Button size="small" color="primary" onClick={() => { handleCardClick("TPA") }}>
                                        Click to continue <ArrowForwardIosIcon />
                                    </Button>
                                </CardActions> */}
                            </Card>
                        </Grid>
                    </Grid>
                </div>
                <Login selectedCard={selectedCard} isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
                {/* <SpecialistCards /> */}
            </div>
            {/* <div style={{width:'80vw', margin:'auto',marginTop:'85px'}}>
                <CarouselComponent />
            </div> */}
            <div style={{ width: '80vw', margin: 'auto', marginTop: '85px' }}>
                <HealthNews />
                <div style={{ width: '80vw', margin: 'auto', marginTop: '85px' }}>
                    <Excellence />
                </div>
            </div>
            <div style={{ width: '80vw', margin: 'auto', marginTop: '85px' }}>
                <FaqComponent />
            </div>
        </>
    )
}

export default LandingPage;