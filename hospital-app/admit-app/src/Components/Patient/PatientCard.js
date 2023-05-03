import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import appStore from '../../Store/store';
import { getAdmissionByEmail } from '../../Api/api';
import Divider from '@material-ui/core/Divider';
import { getAllRooms } from '../../Api/getApi';
import patientStore from '../../Store/patientStore';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
    margin: 'auto',
    marginTop: theme.spacing(2),
    padding: '25px',
    borderRadius: '10px',
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  title: {
    fontSize: 14,
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
}));

const PatientCard = () => {
  const classes = useStyles();
  const [patientData, setPatientData] = useState(null);
  const [roomno, setRoomno] = useState();


  const pemail = appStore.account.email;
  const roomNumber = patientStore.roomNo;
  const patientID = appStore.account.patientID;
  let pName = '';

  useEffect(() => {
    fetchData(pemail);
    getRoomStatus(roomNumber);
    
  }, []);

  const getPname = () => {
    if (localStorage.getItem('user') == "Patient") {
      return appStore.account.name;
    }
    // console.log(pName)
  }

  const fetchData = async (email) => {
    const response = await getAdmissionByEmail((appStore.account.email));
    console.log(patientData, 'data');
    await setPatientData(response);
    const response2 = await axios.get(`http://localhost:8592/rooms/viewRoomByPatientId/${appStore.account.patientId}`);
    setRoomno(response2.data.roomNo);
  };

  const getRoomStatus = async (roomNumber) => {
    try {
      const response = await getAllRooms();

      const myRoom = response.find(room => room.roomNumber === roomNumber);

      const status = myRoom.status;

      patientStore.setRoomRequest(status);

    } catch (error) {
      console.error(error);
    }

  }
  return (

    <Card className={classes.root}>
      <Typography style={{ textAlign: 'center', fontSize: '25px', fontWeight: 'bold' }}>Patient Card</Typography>
      <CardContent>
        <div className={classes.header} style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <Typography className={classes.title} color="textSecondary" variant="h6" gutterBottom>
              Admission Details
            </Typography>
            <Typography style={{ fontSize: '20px' }} className={classes.status} color="primary" variant="subtitle1">
              <b>{patientData?.status}</b>
            </Typography>
          </div>
          <div>
            <Typography className={classes.fieldTitle} color="textSecondary" variant="body2">
              Admission ID
            </Typography>
            <div className={classes.field}>
              <Typography variant="body1" component="p">
                <b>{patientData?.admissionId}</b>
              </Typography>
            </div>
          </div>
        </div>
        <Divider className={classes.divider} />
        <div className={classes.body}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px' }}>
            <div className={classes.field}>
              <Typography className={classes.fieldTitle} color="textSecondary" variant="body2">
                Name
              </Typography>
              <Typography variant="body1" component="p">
                <b>{getPname()}</b>
              </Typography>
            </div>
            <div className={classes.field}>
              <Typography className={classes.fieldTitle} style={{ textAlign: 'right' }} color="textSecondary" variant="body2">
                Email
              </Typography>
              <Typography variant="body1" component="p">
                <b>{patientData?.patientEmail}</b>
              </Typography>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px' }}>
            <div className={classes.field}>
              <Typography className={classes.fieldTitle} color="textSecondary" variant="body2">
                Problem
              </Typography>
              <Typography variant="body1" component="p">
                <b>{patientData?.problem}</b>
              </Typography>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px' }}>
            <div className={classes.field}>
              <Typography className={classes.fieldTitle} color="textSecondary" variant="body2">
                Admission Date
              </Typography>
              <Typography variant="body1" component="p">
                {patientData?.admissionDate}
              </Typography>
            </div>
            <div className={classes.field}>
              <Typography className={classes.fieldTitle} color="textSecondary" variant="body2">
                Discharge Date
              </Typography>
              <Typography variant="body1" component="p">
                {patientData?.dischargeDate}
              </Typography>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px' }}>
            <div className={classes.field}>
              <Typography className={classes.fieldTitle} color="textSecondary" variant="body2">
                Insurance ID
              </Typography>
              <Typography variant="body1" component="p">
                {patientData?.insuranceId}
              </Typography>
            </div>
            <div className={classes.field}>
              <Typography className={classes.fieldTitle} color="textSecondary" variant="body2">
                TPA ID
              </Typography>
              <Typography variant="body1" component="p">
                {patientData?.tpaId}
              </Typography>
            </div>

          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px' }}>

            <div className={classes.field}>
              <Typography className={classes.fieldTitle} color="textSecondary" variant="body2">
                Mobile
              </Typography>
              <Typography variant="body1" component="p">
                {patientData?.mobile}
              </Typography>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px' }}>
            <div className={classes.field}>
              <Typography className={classes.fieldTitle} color="textSecondary" variant="body2">
                Room No
              </Typography>
              <Typography variant="body1" component="p">
                <b>{roomno}</b>
              </Typography>
            </div>
            <div className={classes.field}>
              <Typography className={classes.fieldTitle} color="textSecondary" variant="body2">
                Patient ID
              </Typography>
              <Typography variant="body1" component="p">
                <b>{patientData?.patientId}</b>
              </Typography>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>


  );
};

export default (PatientCard);
