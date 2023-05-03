import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  TablePagination,
  Button
} from "@mui/material";
import { getAllAdmissions, getAllPatients } from "../../Api/getApi";
import DischargeModal from "./DischargeModal";

function DisplayPatients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isDischarge, setIsDischarge] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [patientData, setPatientData] = useState();



  useEffect(() => {
    getData();
  }, []);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const getData = async () => {
    try {
      const response = await getAllAdmissions();
      if (response) {
        setPatients(response);
        console.log(response);
        setTimeout(() => {
          setLoading(false);
        }, 1100);
      }

    } catch (error) {
      console.log(error);
    }

  }

  const allottedCount = () => {
    let count = 0;
    patients.map((each) => {
      if (each.roomNo !== null && each.roomNo !== 0) {
        count++;
      }
    })
    return count;
  }

  const handleDischarge = (room) => {
    setIsDischarge(true);
    setModalOpen(true);
    setPatientData(room);
  }


  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </div>
    );
  }

  if (!patients.length) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Typography variant="h4">No patients found.</Typography>
      </div>
    );
  }

  return (
    <TableContainer component={Paper}>
      <div style={{ textAlign: 'center' }}>
        <h1>Patient Data</h1>
        <h3>Total Patients-{patients.length}</h3>
        <h3>Room Allotted Patients-{allottedCount()}</h3>
      </div>
      <Table sx={{ minWidth: 650 }} aria-label="patient table">
        <TableHead>
          <TableRow>
            <TableCell>Admission ID</TableCell>
            <TableCell>Patient ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Problem</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Mobile</TableCell>
            <TableCell>Room No</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patients
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((patient) => (
              <TableRow key={patient.id}>
                <TableCell>{patient.admissionId}</TableCell>
                <TableCell>{patient.patientId}</TableCell>
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.problem}</TableCell>
                <TableCell>{patient.patientEmail}</TableCell>
                <TableCell>{patient.mobile}</TableCell>
                <TableCell>{patient.roomNo == 0 ? '-' : patient.roomNo}</TableCell>
                <TableCell>{patient.status}</TableCell>

                <TableCell>
                  {patient.roomNo !== null && patient.roomNo !== 0 ? (
                    <Button variant="contained" color="success" onClick={()=>{handleDischarge(patient)}}>
                      Discharge
                    </Button>
                  ) : (
                    "-"
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={patients.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {isDischarge && <DischargeModal call={()=>getData()} spin={()=>setLoading(true)} stopspin={()=>setLoading(false)} data={patientData} isOpen={isDischarge} onClose={()=>{setIsDischarge(false)}} />}
    </TableContainer>
  );
}

export default DisplayPatients;