import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import appStore from '../../Store/store';
import { dateFormat } from '../../utils/common';

const DischargeNotification = () => {
  const [patient, setpatientData] = useState(null);

  useEffect(() => {
    const patientID = appStore.account.patientId;
    getData(patientID);
  }, []);

  const getData = (id) => {
    axios.get(`http://localhost:8564/discharge/getDischargeDetailsByPatientId/${id}`)
      .then(response => {
        setpatientData(response.data);
      })
      .catch(error => {
        console.error('Error fetching discharge details:', error);
      });
  }

  return (
    <Card style={{ borderRadius: '10px' }}>
      <CardContent>
        {patient ? (
          <>
            <Typography variant="h4" align="center" sx={{ fontWeight: 'bold' }} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <img style={{ borderRadius: '10px' }} width={300} src="https://img.medscape.com/thumbnail_library/ih_140815_patient_discharge_orders_doctor_800x600.jpg" alt="Discharge image" />
              Discharge Information
            </Typography>
            <Typography variant="body1" sx={{ mt: 3 }}>
              Patient ID: <b>{patient.patientId}</b>
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Room No: <b>{patient.roomNo}</b>
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Discharge Date: <b>{dateFormat(patient.dischargeDate)}</b>
            </Typography>
            <Typography variant="body1" sx={{ mt: 3 }}>
              <b>We wish you a safe and comfortable discharge from the hospital. Please follow the doctor's instructions and take care of yourself.</b>
            </Typography>
          </>
        ) : (
          <Typography variant="body1" align="center" sx={{ mt: 2 }}>
            <div class="discharge-component">
              <img style={{ borderRadius: '10px' }} width={500} src="https://img.medscape.com/thumbnail_library/ih_140815_patient_discharge_orders_doctor_800x600.jpg" alt="Discharge image" />
              <p style={{ fontSize: '20px' }}>Your discharge details will be updated soon.</p>
            </div>

          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default DischargeNotification;
