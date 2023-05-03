import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { TextField } from '@material-ui/core';
import { Snackbar, Alert } from '@mui/material';
import { updateRoom } from '../../Api/putApi';
import axios from 'axios'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Select,
    MenuItem,
} from '@material-ui/core';
import { updateRoomById } from '../../Api/updateApi';
import { getAllRooms } from '../../Api/getApi';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        borderRadius: '12px',
    },
}));

const RoomDetails = ({ room, open, onClose, roomData }) => {
    const classes = useStyles();
    const [patientId, setPatientId] = useState(room.patientId);
    const [status, setStatus] = useState(room.status);
    const [isEditing, setIsEditing] = useState(false);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    let PatientOldRoom = 0;

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setPatientId(room.patientId);
        setStatus(room.status);
        setIsEditing(false);
    };

    const getRoomsAndFindPatiendRoom = async (id) => {
        try {
            const allRooms = await getAllRooms();
            let patientRoom = await allRooms.filter(room => room.patientId === id);
            console.log(patientRoom.roomNo,'bbb')
            const secondPayload = { 
                roomNo: patientRoom.roomNo,
                wardNo: 1,
                hospitalId: 1,
                patientId: 0,
                status: "Available"
            };
            console.log(patientRoom,'aaaaaaaa')

            await axios.put(`http://localhost:8592/rooms/updateroombyno/${patientRoom.roomNo}`, secondPayload)
                .then(response => {
                    console.log("Second request successful!");
                })
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
    }, []);

    const handleSaveClick = async () => {
        //http://localhost:8592/rooms/viewrooms
        //get room by patientId and first make them available and patient id to 0 then assign the patient to new room
        const payload1 = await {
            "status": "Approved",
            "name": "string",
            "problem": "string",
            "patientId": patientId,
            "mobile": 0,
            "patientEmail": "string",
            "insuranceId": 0,
            "hospitalId": 0,
            "roomNo": room.roomNo,
            "admissionDate": "string",
            "dischargeDate": "string",
            "tpaId": 0
        }
        try {
            await updateRoomById(room.id, { patientId, status: status, wardNo: room.wardNo, roomNo: room.roomNo, hospitalId: room.hospitalId });
            await axios.put(`http://localhost:8563/admission/updateAdmission/${patientId}`, payload1);
            // await getRoomsAndFindPatiendRoom(Number(patientId));
            setIsEditing(false);
            roomData();
            onClose();
            setTimeout(() => {
                setUpdateSuccess(true);
            }, 1000);
        } catch (error) {
            console.log(error);
        }
    };

    const handlePatientIdChange = (event) => {
        setPatientId(event.target.value);
    };

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const handleBackdropClick = () => {
        if (!isEditing) {
            onClose();
        }
    };

    return (
        <div>
            <Modal
                className={classes.modal}
                open={open}
                onClose={handleBackdropClick}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <h1 id="transition-modal-title">
                            Room Number {room.roomNo} - <span style={{ color: room.status === 'occupied' ? 'red' : 'green' }}>{room.status.charAt(0).toUpperCase() + room.status.slice(1)}</span>
                        </h1>
                        <form noValidate autoComplete="off">
                            <TextField
                                id="room-number"
                                label="Room Number"
                                style={{ marginBottom: '25px' }}
                                value={room.roomNo}
                                disabled
                                fullWidth
                            />
                            <TextField
                                id="ward-number"
                                label="Ward Number"
                                style={{ marginBottom: '25px' }}
                                value={room.wardNo}
                                disabled
                                fullWidth
                            />
                            <Select
                                id="status"
                                label="Status"
                                style={{ marginBottom: '25px' }}
                                value={status}
                                onChange={handleStatusChange}
                                disabled={!isEditing}
                                fullWidth
                            >
                                <MenuItem value="Available">Available</MenuItem>
                                <MenuItem value="Occupied">Occupied</MenuItem>
                            </Select>
                            <TextField
                                id="patient-id"
                                label="Patient ID"
                                value={patientId}
                                style={{ marginBottom: '25px' }}
                                onChange={handlePatientIdChange}
                                disabled={!isEditing}
                                fullWidth
                            />
                            {!isEditing && (
                                <Button variant="contained" color="primary" onClick={handleEditClick} style={{ marginTop: '25px' }}>
                                    Reassign
                                </Button>
                            )}
                            {isEditing && (
                                <div style={{ marginTop: '25px', padding: '15px' }}>
                                    <Button variant="contained" style={{ marginRight: '25px' }} onClick={handleCancelClick}>
                                        Cancel
                                    </Button>
                                    <Button variant="contained" color="primary" onClick={handleSaveClick}>
                                        Done
                                    </Button>
                                </div>
                            )}
                        </form>
                    </div>
                </Fade>
            </Modal>
            <Snackbar
                open={updateSuccess}
                autoHideDuration={3000}
                onClose={() => setUpdateSuccess(false)}
                message="Updated Successful"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert onClose={() => setUpdateSuccess(false)} severity="success">
                    Updated Successful
                </Alert>
            </Snackbar>

        </div>
    );
};

export default RoomDetails;
