import { useEffect, useState } from 'react';
import {
  makeStyles,
  Modal,
  Card,
  CardContent,
  Typography,
  Snackbar,
  Button,
} from '@material-ui/core';
import Alert from "@mui/material/Alert";
import { getAdmissionByPatientId, getAllAdmissions } from '../../Api/getApi';
import { dateFormat } from '../../utils/common';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '25px,',
  },
  card: {
    borderRadius: '15px',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  buttonGroup: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'flex-end',
  },
  cancelButton: {
    marginRight: theme.spacing(2),
  },
  verifiedButton: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.success.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.success.dark,
    },
  },
}));

function VerifyClaimModal({ open, onClose, claimDetails }) {
  const classes = useStyles();
  const [isVerified, setIsVerified] = useState(false);
  const [admissionData, setadmissionData] = useState();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
};

  const handleVerified = () => {
    setIsVerified(true);
    setSnackbarOpen(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  useEffect(() => {
    const id = claimDetails.patientId;
    setTimeout(() => {

      getAdmissionCard(claimDetails.patientId);
    }, 100);
  }, [])

  const getAdmissionCard = async (id) => {
    try {
      const res = await getAllAdmissions();
      console.log(res, 'data')

      if (res) {
        const myAdmission = res.find(admission => admission.patientId === id);
        setadmissionData(myAdmission);
        console.log(myAdmission,'aaa');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Modal
      className={classes.modal}
      open={true}
      onClose={onClose}
      aria-labelledby="verify-claim-modal"
      aria-describedby="verify-claim-modal-description"
    >
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" component="h2" style={{marginBottom:'15px'}}>
            Verify Claim Details
          </Typography>
          <Typography color="textSecondary" gutterBottom style={{marginBottom:'15px'}}>
            Insurance Id: <b>{admissionData?.insuranceId}</b>
          </Typography>
          <Typography color="textSecondary" gutterBottom style={{marginBottom:'15px'}}>
            Admission Id: <b>{admissionData?.admissionId}</b>
          </Typography>
          <Typography variant="h6" component="h2">
            Name: {admissionData?.name}
          </Typography>
          <Typography variant="h6" component="h2">
            Problem: {admissionData?.problem}
          </Typography>
          <Typography variant="h6" component="h2">
            Mobile: {admissionData?.mobile}
          </Typography>
          <Typography variant="h6" component="h2">
            Email: {admissionData?.patientEmail}
          </Typography>
          <Typography variant="h6" component="h2">
            Room No: {admissionData?.roomNo}
          </Typography>
          <Typography variant="h6" component="h2">
            Admission Date: {dateFormat(admissionData?.admissionDate)}
          </Typography>
          <Typography variant="h6" component="h2">
            Discharge Date: {dateFormat(claimDetails?.dischargeDate)}
          </Typography>
        </CardContent>
        <div className={classes.buttonGroup}>
          <Button
            className={classes.cancelButton}
            variant="contained"
            color="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>
          {!isVerified && (
            <Button
              className={classes.verifiedButton}
              variant="contained"
              onClick={handleVerified}
            >
              Verified
            </Button>
          )}
        </div>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={5000}
          onClose={handleSnackbarClose}
        >
          <Alert severity="success">Verified Successfully</Alert>
        </Snackbar>
      </Card>
    </Modal>
  );
}

export default VerifyClaimModal;