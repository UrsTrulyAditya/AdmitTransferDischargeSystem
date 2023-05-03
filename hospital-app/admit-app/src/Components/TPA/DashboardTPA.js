import { useEffect, useState } from 'react';
import { Card, CardContent, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button, Link, TablePagination } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { checkToken, checkUser } from '../../utils/common';
import VerifyClaimModal from '../TPA/VerifyClaim';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import { dateFormat } from '../../utils/common';

function DischargeTable({ dischargeData }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [verify, setVerify] = useState(false);
  const [data, setData] = useState();


  const navigate = useNavigate();

  useEffect(() => { 
    console.log(dischargeData,'data')
    const isTokenPresent = checkToken();
    if (!isTokenPresent) {
      navigate('/');
    }
    checkUser("TPA");
    window.scrollTo(0, 0);
  }, [navigate]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleVerify = (data) => {
    setData(data);
    setVerify(true);
  }
  return (
    <>
    <Card sx={{ maxWidth: 800, margin: "auto", mt: 3 }}>
      <CardContent>
        <h1>Discharge Data</h1>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="discharge details table">
            <TableHead>
              <TableRow>
                <TableCell>Patient Id</TableCell>
                <TableCell>Room No</TableCell>
                {/* <TableCell>Transfer date</TableCell> */}
                <TableCell>Discharge Date</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dischargeData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.patientId}</TableCell>
                  <TableCell>{row.roomNo}</TableCell>
                  <TableCell>{dateFormat(row.dischargeDate)}</TableCell>
                  {/* <TableCell>{row.requestDate}</TableCell> */}
                  <TableCell style={{color:'green'}}>{row.status}</TableCell>
                  <TableCell>
                    <Button variant="contained" endIcon={<FingerprintIcon />} onClick={()=>handleVerify(row)}>
                      Verify
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5,10, 25, 50]}
            component="div"
            count={dischargeData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </CardContent>
    </Card>
    {verify && <VerifyClaimModal open={true} onClose={()=>setVerify(false)} claimDetails={data} /> }
    </>
  );
}
export default DischargeTable;