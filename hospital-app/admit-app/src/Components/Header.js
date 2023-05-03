import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { inject } from 'mobx-react';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import PhoneIcon from '@material-ui/icons/Phone';
import appStore from '../Store/store';
import ContactUs from './ContactUs';
import BookAppointment from './BookAppointment';

const useStyles = makeStyles((theme) => ({
  header: {
    marginBottom: '100px',
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  link: {
    marginLeft: theme.spacing(4),
    textDecoration: 'none',
    color: 'inherit',
    display: 'flex',
    alignItems: 'center',
    color: '#3d7ba2'
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}));

export default function Header() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [isContactModalOpened, setContactModalOpened] = useState(false);
  const [isBookAppOpened, setBookAppOpened] = useState(false);


  const handleBookAppointmentClick = () => {
    setBookAppOpened(true);
  };

  const handleContactUsClick = () => {
    setContactModalOpened(true);
  };

  return (
    <div className="header">
      <div className={classes.header}>
        <AppBar position="fixed" style={{ backgroundColor: '#ffffff' }}>
          <Toolbar variant="dense">
            <div className={classes.logo}>
              <LocalHospitalIcon fontSize="large" />
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
                <img width={'60px'} src='http://res.cloudinary.com/daari0y7l/image/upload/v1682171410/IMG_20230422_175501_182_yim1qw.png' />
                <Typography
                  variant="h5"
                  color="inherit"
                  component="div"
                  style={{ fontWeight: 'bold', color: '#3d7ba2' }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
                    <span style={{ fontSize: '22px', color: '#000000', fontWeight: 'bolder' }}>AdmitSure</span>
                    {/* <span style={{ fontSize: '15px' }}>Hospitals</span> */}
                  </div>
                </Typography>
              </Link>
            </div>
            <div className={classes.links}>
              <div
                className={classes.link}
                onClick={handleBookAppointmentClick}
                style={{ cursor: 'pointer' }}
              >
                <CalendarTodayIcon className={classes.icon} />
                <Typography variant="subtitle1" color="inherit" component="div">
                  Book an Appointment
                </Typography>
              </div>
              <div
                className={classes.link}
                onClick={handleContactUsClick}
                style={{ cursor: 'pointer' }}
              >
                <PhoneIcon className={classes.icon} />
                <Typography variant="subtitle1" color="inherit" component="div">
                  Contact Us
                </Typography>
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </div>
      {isContactModalOpened && <ContactUs isOpen={isContactModalOpened} onClose={() => setContactModalOpened(false)} />}
      {isBookAppOpened && <BookAppointment isOpen={isBookAppOpened} onClose={() => setBookAppOpened(false)} />}
    </div>
  );
}
