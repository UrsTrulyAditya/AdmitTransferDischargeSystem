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
import { getAllRooms } from '../../Api/getApi';
import RoomDetails from './RoomDetailsComponent';
import { CircularProgress, Typography } from '@material-ui/core'
import { Menu, IconButton } from '@material-ui/core';
import { Sort } from '@material-ui/icons';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function RoomsComponent() {
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
  const [typeFilter, setTypeFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [anchorEl, setAnchorEl] = useState(null);

  const roomData = async () => {
    try {
      const response = await getAllRooms();
      if (response) {
        setRooms(response);
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
    setPage(0);
  };

  const handleTypeFilterChange = (event) => {
    setTypeFilter(event.target.value);
    console.log(event.target.value, 'value');
    setPage(0);
  };
  const handleTableRowClick = (room) => {
    setOpenDetails(true);
    setSendData(room);
    setModalOpen(true);
  };
  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const sortedData = [...rooms].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.amount - b.amount;
    } else {
      return b.amount - a.amount;
    }
  });
  const filteredRooms = sortedData.filter((room) => {
    if (statusFilter && room.status !== statusFilter) {
      return false;
    }
    if (typeFilter && room.type !== typeFilter) {
      return false;
    }
    return true;
  });

  const handleSortOrderChange = (event,name) => {
    // console.log(name, 'value');
    setSortOrder(name);
  };



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
        <Typography>No Records found.</Typography>
      </div>
    );
  }
  return (
    <div>
      <h1>Rooms</h1>
      <div style={{ display: 'flex' }}>
        <Select value={statusFilter} onChange={handleStatusFilterChange} style={{ marginRight: '25px' }}>
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Available">Available</MenuItem>
          <MenuItem value="Occupied">Occupied</MenuItem>
          <MenuItem value="Requested">Requested</MenuItem>

        </Select>

        
        <Select value={statusFilter} onChange={handleTypeFilterChange} style={{ marginRight: '25px' }}>
          <MenuItem value="">All</MenuItem>
          <MenuItem value="AC">AC</MenuItem>
          <MenuItem value="NON-AC">NON-AC</MenuItem>

        </Select>
        {/* <Select value={sortOrder} onChange={handleSortOrderChange} style={{ marginLeft: 'auto' }}>
          <MenuItem value="asc">Sort by amount (low to high)</MenuItem>
          <MenuItem value="desc">Sort by amount (high to low)</MenuItem>
        </Select> */}

        <IconButton onClick={openMenu} style={{marginLeft:'auto'}}>
          <Sort />
        </IconButton>
        <Menu anchorEl={anchorEl} onChange={handleSortOrderChange} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
          <MenuItem value="asc" onClick={(event) => handleSortOrderChange(event, 'asc')}>
            Sort by amount (low to high)
          </MenuItem>
          <MenuItem value="desc" onClick={(event) => handleSortOrderChange(event, 'desc')}>
            Sort by amount (high to low)
          </MenuItem>
        </Menu>
      </div>
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Ward No</TableCell>
              <TableCell>Room No</TableCell>
              <TableCell>Patient Id</TableCell>
              <TableCell>Room Type</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? filteredRooms.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : filteredRooms
            ).map((room) => (
              <TableRow key={room.id} hover onClick={() => handleTableRowClick(room)}>
                <TableCell>{room.wardNo}</TableCell>
                <TableCell>{room.roomNo}</TableCell>
                <TableCell>{room.patientId}</TableCell>
                <TableCell><span style={{ textAlign: 'center' }}>{room.type}</span></TableCell>
                <TableCell><span><b>Rs.{room.amount}/-</b></span></TableCell>
                <TableCell>{room.status == 'Available' || room.status == 'available' ? <span style={{ color: 'green' }}><b>Available</b></span> : ((room.status === 'occupied' || room.status === 'Occupied') && <span style={{ color: '#ce1212' }}><b>Occupied</b></span> || (room.status === 'Requested' && <span style={{ color: '#1b78c8' }}><b>Requested</b></span>))}</TableCell>

                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleTableRowClick(room)}>
                    View Details
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
      {openDetails && <RoomDetails roomData={roomData} room={sendData} open={isModalOpen} onClose={() => setModalOpen(false)} />}
    </div>
  );
}

export default RoomsComponent;