import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Typography, TablePagination, Paper } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { getAllRooms } from '../../Api/getApi'; 
import ReqRoomtransfer from './ReqRoomTransfer';
import { Sort } from '@material-ui/icons';
import { Menu, MenuItem, IconButton } from '@material-ui/core';


const RoomTransfer = () => {
  const [rooms, setRooms] = useState([]);
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isReqRoomModalOpen, setReqRoomModalOpen] = useState(false);
  const [reqRoom, setReqRoom] = useState();
  const [sortOrder, setSortOrder] = useState('asc');
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useNavigate();

  useEffect(() => {
    async function fetchRooms() {
      const response = await getAllRooms();
      setRooms(response);
    }
    fetchRooms();
  }, []);

  const handleRoomTransfer = (room) => {
    setReqRoomModalOpen(true);
    setReqRoom(room);

  };

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSortOrderChange = (event,name) => {
    // console.log(name, 'value');
    setSortOrder(name);
  };

  const sortedData = [...rooms].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.amount - b.amount;
    } else {
      return b.amount - a.amount;
    }
  });

  const filteredRooms = filter === 'all' ? sortedData : sortedData.filter(room => room.type === filter);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, sortedData.length - page * rowsPerPage);

  return (
    <div>
    <Paper style={{padding:'25px',borderRadius:'10px'}}>
      <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', mt: 3 }}>
        Rooms
      </Typography>
      <Table sx={{ mt: 3 }}>
        <TableHead>
        <IconButton onClick={openMenu} >
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
          <TableRow>
            <TableCell>Room No</TableCell>
            <TableCell>Ward No</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? filteredRooms.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : filteredRooms
          ).map((room) => (
            <TableRow key={room.roomId}>
              <TableCell>{room.roomNo}</TableCell>
              <TableCell>{room.wardNo}</TableCell>
              <TableCell><span style={{ textAlign: 'center' }}>{room.type}</span></TableCell>
                <TableCell><span><b>Rs.{room.amount}/-</b></span></TableCell>


              <TableCell>-</TableCell>
              <TableCell>
                {room.status == 'Requested' && <span style={{color:'#3f51b5'}}>Requested</span>}
                {room.status == 'Occupied' ? <span style={{color:'red'}}>Occupied</span> : room.status!=="Requested" && <span style={{color:'green'}}>Available</span>}
              </TableCell>
              <TableCell>
                {room.status !== 'Available' ? (
                  room.status=="Requested" ?  <Button disabled >Requested Already</Button>
                  : <Button disabled >Occupied Already</Button>
                ) : (
                  <Button variant="contained" color="primary" onClick={() => handleRoomTransfer(room)}>Request Room</Button>
                )}
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
        count={sortedData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <div sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Button variant={filter === 'all' ? 'contained' : 'outlined'} onClick={() => setFilter('all')} sx={{ mr: 1 }}>
          All
        </Button>
        <Button variant={filter === 'AC' ? 'contained' : 'outlined'} onClick={() => setFilter('AC')}>
          AC
        </Button>
        <Button variant={filter === 'NON-AC' ? 'contained' : 'outlined'} onClick={() => setFilter('NON-AC')}>
          NON-AC
        </Button>
      </div>
    </Paper>
    {isReqRoomModalOpen && <ReqRoomtransfer reqRoom={reqRoom} isOpen={true} onClose={()=> setReqRoomModalOpen(false)} />}
    </div>
  )}
export default RoomTransfer;