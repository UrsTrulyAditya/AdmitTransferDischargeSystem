import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    top: 0,
    bottom:500,
    left: 850,
    right: 0,
    textAlign:'center',
    // marginLeft:'850px',
    // position: 'fixed',
    zIndex: 9999,
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function NotificationPopup({ open, handleClose, message, severity }) {
  const classes = useStyles();

  return (
    <Snackbar open={open} autoHideDuration={8000} onClose={handleClose} className={classes.root}>
      <Alert onClose={handleClose} severity={severity}>
        {message}
        {console.log('discharge popup')}
      </Alert>
    </Snackbar>
  );
}
