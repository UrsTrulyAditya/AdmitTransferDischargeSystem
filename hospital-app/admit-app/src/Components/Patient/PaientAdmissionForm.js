import { useState, React, useEffect } from 'react';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import appStore from '../../Store/store';
import { toJS } from 'mobx';
import axios from 'axios';
import { getAdmissionByEmail } from '../../Api/api';
import patientStore from '../../Store/patientStore';
import PatientCard from './PatientCard';

const PatientAdmissionForm = ({startSpin, stopSpin}) => {
  const [status, setStatus] = useState('');
  const [name, setnName] = useState('');
  const [mobile, setMobile] = useState('');
  const [problem, setProblem] = useState('');

  const [patientId, setPatientId] = useState(0);
  const [patientEmail, setPatientEmail] = useState('');
  const [insuranceId, setInsuranceId] = useState(0);
  const [hospitalId, setHospitalId] = useState(0);
  const [roomNo, setRoomNo] = useState(0);
  const [admissionDate, setAdmissionDate] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [tpaId, setTpaId] = useState(0);
  const [patientData, setPatientData] = useState();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [globalStatus, setGlobalStatus] = useState();
  const [isPatientCard, setPatientCard] = useState(false);
  const [hideForm, sethideForm] = useState(false);



  const handleSubmit = (e) => {
    e.preventDefault(); 
    const payload={
      status: "Pending",
      patientId: patientId,
      patientEmail: patientEmail,
      name:name,
      insuranceId: insuranceId,
      problem:problem,
      mobile:mobile,
      hospitalId: 1,
      roomNo: 0,
      admissionDate: admissionDate,
      dischargeDate: "-",
      tpaId: 1
    }
    axios.post(`http://localhost:8563/admission/request`, payload)
      .then((response) => {
       console.log(response,'admRes');
      
      setFormSubmitted(true);
      startSpin();
      setTimeout(() => {
        stopSpin();
      }, 500);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(()=>{
    patientDetails();
    getStatus();
  },[]);

  const patientDetails = () => {
    const data = toJS(appStore.account);
    setPatientData(data);
    setPatientEmail(data.email);
    setPatientId(data.patientId);
    setnName(data.name);
    setMobile(data.mobile);
    setProblem(data.problem);


  }
  const getStatus = async() => {
    try {
      const res = await getAdmissionByEmail(toJS(appStore.account.email));
      console.log(res,'llll');
      setGlobalStatus(res.status);
      patientStore.setGlobalState(res.status);
      if(res.status=="Discharge" || res.status=="Approved"){
        setPatientCard(true);
        sethideForm(true);
      }
      
    } catch (error) {
      console.log(error);
    }
  }
 
  return (
    <>

   { !hideForm && <Card variant="outlined" style={{padding:'15px',borderRadius:'15px'}}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Admission Form
        </Typography>
        
        {globalStatus=="Pending"  ? <div>Admission is in Progress</div> : (globalStatus!=="Approved" && globalStatus!=="Discharge" ?
         <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                fullWidth
                value={name}
                // onChange={(e) => setStatus(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Mobile"
                fullWidth
                value={mobile}
                onChange={(e) => setStatus(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Problem"
                fullWidth
                value={problem}
                // onChange={(e) => setStatus(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Patient ID"
                fullWidth
                type="number"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Patient Email"
                fullWidth
                value={patientEmail}
                onChange={(e) => setPatientEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Insurance ID"
                fullWidth
                type="number"
                value={insuranceId}
                inputProps={{maxLength:5}}
                onChange={(e) => setInsuranceId(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Hospital ID"
                fullWidth
                type="number"
                value={1}
                disabled
                // onChange={(e) => setHospitalId(e.target.value)}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <TextField
                label="Room No"
                fullWidth
                type="number"
                value={roomNo}
                onChange={(e) => setRoomNo(e.target.value)}
              />
            </Grid> */}
            <Grid item xs={12}>
              <InputLabel>Admission Date</InputLabel>
              <TextField
                // label="Admission Date"
                fullWidth
                type='date'
                required
                InputProps={{ disableUnderline: true, placeholder: '' }}
                value={admissionDate}
                onChange={(e) => setAdmissionDate(e.target.value)}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <TextField
                label="Discharge Date"
                fullWidth
                value={dischargeDate}
                onChange={(e) => setDischargeDate(e.target.value)}
              />
            </Grid> */}
            <Grid item xs={12}>
              <TextField
                label="TPA ID"
                fullWidth
                value={1}
                // onChange={(e) => setDischargeDate(e.target.value)}
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained"
                type="submit"
                color="primary"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form> : <div>Admission request Approved </div>)}
      </CardContent>
    </Card>}

    {isPatientCard && <PatientCard />}

    </>
  )
};

export default PatientAdmissionForm;
