import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Modal,
    Card,
    CardContent,
    Typography,
    Box,
    IconButton,
} from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        maxWidth: 400,
        padding: theme.spacing(2),
        borderRadius: '10px'
    },
    phoneIcon: {
        marginRight: theme.spacing(1),
    },
}));

function ContactUs({ isOpen, onClose }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Modal
                className={classes.modal}
                open={isOpen}
                onClose={onClose}
                aria-labelledby="contact-us-modal"
                aria-describedby="contact-us-details"
            >
                <Card className={classes.card}>
                    <CardContent>
                        <div style={{ marginBottom:'15px',textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
                            <img width={'60px'} src='http://res.cloudinary.com/daari0y7l/image/upload/v1682171410/IMG_20230422_175501_182_yim1qw.png' />
                            <Typography
                                variant="h5"
                                color="inherit"
                                component="div"
                                style={{ fontWeight: 'bold', color: '#3d7ba2' }}
                            >
                                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
                                    <span style={{ fontSize: '20px', color: '#000000', fontWeight: 'bolder' }}>HealthSure</span>
                                    <span style={{ fontSize: '15px' }}>Hospitals</span>
                                </div>
                            </Typography>
                        </div>
                        <Typography variant="body1" component="p" gutterBottom>
                            HealthSure Hospitals is a leading healthcare provider committed to
                            providing high-quality care to patients. Our hospitals are equipped
                            with the latest medical technology and staffed by experienced and
                            compassionate healthcare professionals.
                        </Typography>
                        <Box alignItems="center" style={{display:'flex', marginTop:'25px'}} >
                            <PhoneIcon className={classes.phoneIcon} />
                            <Typography variant="body1" component="p">
                                Contact us : <b>123-456-7890</b>
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Modal>
        </div>
    );
}

export default ContactUs;
