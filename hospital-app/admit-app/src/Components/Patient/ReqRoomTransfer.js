import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, TextField, Button } from '@material-ui/core';
import axios from 'axios';
import appStore from '../../Store/store';
import patientStore from '../../Store/patientStore';
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width:'30vw',
    margin:'auto'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // padding: theme.spacing(10),
    paddingLeft:'20px',
    paddingRight:'20px',
    paddingBottom:'20px',
    borderRadius:'10px',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    outline: 'none',
    width:'100%'
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  button: {
    // marginRight: theme.spacing(1),
    margin:'auto'
  },
}));

const ReqRoomtransfer = ({ isOpen, onClose, reqRoom }) => {
  const classes = useStyles();
  const [currentRoom, setCurrentRoom] = useState('');
  const [requestRoom, setRequestRoom] = useState('');

  const handleCurrentRoomChange = (e) => {
    setCurrentRoom(e.target.value);
  };

  const handleRequestRoomChange = (e) => {
    setRequestRoom(e.target.value);
  };

  const handleSubmit = async () => {
    const payload = {
      roomNo: reqRoom.roomNo,
      wardNo: 1,
      hospitalId: 1,
      patientId: appStore.account.patientId,
      status: "Requested",
    };
    // console.log(payload, "load");
    try {
      const res = await axios.put(
        `http://localhost:8592/rooms/updateroombyno/${reqRoom.roomNo}`,
        payload
      );
      console.log(res);
      patientStore.setRoomNo(reqRoom.roomNo);
      patientStore.setRoomRequest("Requested");
     
  
      // const thirdPayload = {
      //   admissionId: 0,
      //   status: "Approved",
      //   name: "string",
      //   problem: "string",
      //   patientId: appStore.account.patientId,
      //   mobile: 0,
      //   patientEmail: "string",
      //   insuranceId: 0,
      //   hospitalId: 0,
      //   roomNo: reqRoom.roomNo,
      //   admissionDate: "string",
      //   dischargeDate: "string",
      //   tpaId: 0
      // };
      // const thirdRes = await axios.put(
      //   `http://localhost:8563/admission/updateAdmission/${appStore.account.patientId}`,
      //   thirdPayload
      // );
      // console.log(thirdRes);

      const secondPayload = {
        roomNo: currentRoom,
        wardNo: 1,
        hospitalId: 1,
        patientId: 0,
        status: "Available",
      };
      const secondRes = await axios.put(
        `http://localhost:8592/rooms/updateroombyno/${currentRoom}`,
        secondPayload
      );
      console.log(secondRes);

      setTimeout(() => {
        onClose();
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <Modal open={isOpen} onClose={onClose} className={classes.modal}>
      <div className={classes.form}>
        <h2>Room Transfer Request</h2>
        <TextField
          label="Current Room Number"
          value={currentRoom}
          onChange={handleCurrentRoomChange}
          variant="outlined"
          className={classes.textField}
          style={{width:'100%'}}
        />
        <TextField
          label="Requested Room Number"
          value={reqRoom.roomNo}
        //   onChange={handleRequestRoomChange}
            disabled
          variant="outlined"
          className={classes.textField}
          style={{width:'100%'}}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}
        style={{marginBottom:'15px'}}>
          Send Request
        </Button>
        <Button variant="contained"  color="secondary" className={classes.button} onClick={onClose} >
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default ReqRoomtransfer;
