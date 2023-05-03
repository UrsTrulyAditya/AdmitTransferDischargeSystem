import React, { useEffect, useState } from "react";
import axios from 'axios';
import {
    Modal,
    Backdrop,
    Fade,
    Typography,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Snackbar, Alert } from '@mui/material';
import { getAllRooms } from "../../Api/getApi";
import { allRoomsData } from "../rooms";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(4, 6, 3),
        borderRadius: '15px'
    },
}));

const RequestDetails = ({ open, onClose, room, roomData, }) => {
    const classes = useStyles();
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [allrooms, setAllRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState();
    const [clickedroom, setclickedroom] = useState();

    const handleRoomSelect = (event) => {
        setSelectedRoom(event.target.value);
    };

    const clickRoom = (roomNo) => {
        setclickedroom(roomNo);
    }


    const handleApprove = () => {
        console.log(room, 'daaaaaata');
        const status = "Approved";
        const payload = {
            admissionId: room.admissionId,
            status: status,
            patientId: room.patientId,
            patientEmail: room.patientEmail,
            insuranceId: room.insuranceId,
            hospitalId: room.hospitalId,
            roomNo: clickedroom,
            admissionDate: room.admissionDate,
            dischargeDate: room.dischargeDate,
            tpaId: room.tpaId
        };

        axios.put(`http://localhost:8563/admission/update/${room.admissionId}`, payload)
            .then(response => {
                console.log("First request successful!");
 
                const secondPayload = { 
                    roomNo: clickedroom,
                    wardNo: 1,
                    hospitalId: 1,
                    patientId: room.patientId,
                    status: "Occupied"
                };

        axios.put(`http://localhost:8592/rooms/updateroombyno/${clickedroom}`, secondPayload)
            .then(response => {
                console.log("Second request successful!");
                roomData();
                onClose();
                fetchRooms();
                setTimeout(() => {
                    setUpdateSuccess(true);
                }, 1000)
            })
            .catch(error => {
                console.log(error);
            });
            })
            .catch(error => {
                console.log(error);
            });
    };


    const handleCancel = () => {
        // console.log(room, 'daaaaaata22');
        const status = "Denied";
        const payload = {
            admissionId: room.admissionId,
            status: status,
            patientId: room.patientId,
            patientEmail: room.patientEmail,
            insuranceId: room.insuranceId,
            hospitalId: room.hospitalId,
            roomNo: null,
            admissionDate: room.admissionDate,
            dischargeDate: room.dischargeDate,
            tpaId: room.tpaId
        };
        axios.put(`http://localhost:8563/admission/updateStatus/${room.admissionId}`, payload)
            .then(response => {
                //   console.log(response.data);
                console.log("Request approved!");
                onClose();
                roomData();
                setTimeout(() => {
                    setUpdateSuccess(true);
                }, 400);
            })
            .catch(error => {
                console.log(error);
            });
    };

    React.useEffect(() => {
        fetchRooms();
    }, []);

    const fetchRooms = async() => {
        try {
            const res = await getAllRooms();
            if(res){
                const availableRooms = res.filter(room => room.status === "Available");
                setAllRooms(availableRooms);
            }
            // setAllRooms(allRoomsData);            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <Modal
                className={classes.modal}
                open={open}
                onClose={onClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <Typography variant="h5" gutterBottom>
                            Do you want to approve the request and allot a room?
                        </Typography>
                        {/* <FormControl variant="outlined" className={classes.formControl}> */}
                        <InputLabel htmlFor="room-select" style={{ marginTop: '25px', color: 'black' }}>Allot a room</InputLabel>
                        <Select
                            value={selectedRoom}
                            onChange={handleRoomSelect}
                            label="Allot a room"
                            inputProps={{
                                name: "room",
                                id: "room-select"
                            }}
                            style={{ width: '50%' }}
                        >
                            {allrooms.map((each) => (
                                <MenuItem key={each.id} value={each.id} onClick={() => clickRoom(each.roomNo)}>
                                    {each.roomNo}
                                </MenuItem>
                            ))}
                        </Select>

                        {/* </FormControl> */}

                        <div style={{ marginTop: '45px', display: 'flex' }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleApprove}
                                style={{ marginRight: "10px" }}
                            >
                                Yes
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={handleCancel}
                            >
                                No
                            </Button>
                        </div>
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

export default RequestDetails;
