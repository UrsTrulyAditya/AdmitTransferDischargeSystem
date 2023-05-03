import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import TablePagination from '@material-ui/core/TablePagination';
import { getAllAdmissions, getAllRooms } from '../../Api/getApi';
import RoomDetails from './RoomDetailsComponent';
import {CircularProgress,Typography} from '@material-ui/core'
import RequestDetails from './RequestDetails';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function PatientRequests() {
  const classes = useStyles();
  const history = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDetails, setOpenDetails] = useState(false);
  const [sendData, setSendData] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);


  const roomData = async () => {
    try {
      const response = await getAllAdmissions();
      if (response) {
        setRooms(response);
        console.log(response);
        setTimeout(() => {
          setLoading(false);          
        }, 1100);
      }

    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    roomData();
  }, []);

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
    setPage(0); // Reset the page to 0 when the filter changes
  };

  const handleTableRowClick = (room) => {
    setOpenDetails(true);
    setSendData(room);
    setModalOpen(true);
  };

  const filteredRooms = statusFilter
    ? rooms.filter((room) => room.status === statusFilter)
    : rooms;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredRooms.length - page * rowsPerPage);
  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </div>
    );
  }

  if (!rooms.length) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Typography variant="h4">No Records found.</Typography>
      </div>
    );
  }
  return (
    <div>
      <h1>Patient Requests</h1>
      <Select value={statusFilter} onChange={handleStatusFilterChange}>
        <MenuItem value="">All</MenuItem>
        <MenuItem value="Approved">Approved</MenuItem>
        <MenuItem value="Denied">Denied</MenuItem>
        <MenuItem value="Pending">Pending</MenuItem>
      </Select>
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Admission Id</TableCell>
              <TableCell>Patient Id</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Admission Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? filteredRooms.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : filteredRooms
            ).map((room) => (
              <TableRow key={room.id} hover >
                <TableCell>{room.admissionId}</TableCell>
                <TableCell>{room.patientId}</TableCell>
                <TableCell>{room.patientEmail}</TableCell>
                <TableCell>{room.admissionDate}</TableCell>
                <TableCell>{room.status=='Approved' ? <span style={{color:'green'}}><b>Approved</b></span> : ((room.status === 'string'||room.status === 'Pending') ? <span style={{color:'#1b78c8'}}><b>Pending</b></span> : <span style={{color:'red'}}><b>Denied</b></span>)}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleTableRowClick(room)}>
                    Approve / Deny
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={4} />
              </TableRow>
            )}

          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredRooms.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={(event, newPage) => setPage(newPage)}
          onChangeRowsPerPage={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          }}
        />
      </TableContainer>
      {openDetails && <RequestDetails startSpin={()=>setLoading(true)} stopSpin={()=>setLoading(false)} roomData={roomData} room={sendData} open={isModalOpen} onClose={ ()=>setModalOpen(false)}/>}
    </div>
  );
}

export default PatientRequests;