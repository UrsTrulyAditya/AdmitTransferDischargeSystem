import React, { useState } from "react";
import axios from 'axios';
import Alert from "@mui/material/Alert";
import { makeStyles } from "@material-ui/core/styles";
import {
    Button,
    Modal,
    TextField,
    Typography,
    Snackbar
} from "@material-ui/core";

import { InputLabel } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    paper: {
        position: "absolute",
        width: 400,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(5, 6, 5),
        borderRadius: "10px",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    },
    input: {
        marginBottom: theme.spacing(2),
    },
    button: {
        marginRight: theme.spacing(2),
    },
}));

export default function DischargeModal({ call, spin, stopspin, data, isOpen, onClose }) {
    const classes = useStyles();
    const [dischargeDate, setDischargeDate] = useState("");
    const [patientId, setPatientId] = useState(data.patientId);
    const [roomNo, setRoomNo] = useState(data.roomNo);
    const [status, setStatus] = useState("Discharge");
    const [snackbarOpen, setSnackbarOpen] = useState(false);


    const handleDischarge = () => {
        const postData = {
            dischargeDate: dischargeDate,
            patientId: patientId,
            roomNo: roomNo,
            status: status
        };

        axios.post('http://localhost:8564/discharge/addDischargeDetails', postData)
            .then((response) => {
                console.log(response, "done 1");

                const putData = {
                    admissionId: 0,
                    status: status,
                    name: "string",
                    problem: "string",
                    patientId: 0,
                    mobile: 0,
                    patientEmail: "string",
                    insuranceId: 0,
                    hospitalId: 0,
                    roomNo: 0,
                    admissionDate: "string",
                    dischargeDate: dischargeDate,
                    tpaId: 0
                  };

                axios.put(`http://localhost:8563/admission/updateAdmission/${patientId}`, putData)
                    .then((response) => {
                        console.log(response, "done 2");
                    })
                    .catch((error) => {
                        console.log(error);

                    });
                onClose();
                spin();
                setTimeout(() => {
                    call();
                    stopspin();
                }, 600);
                setSnackbarOpen(true);
            })
            .catch((error) => {
                console.log(error);
            });
    };


    const handleCancel = () => {
        setDischargeDate("");
        setPatientId("");
        setRoomNo("");
        setStatus("Discharge");
        onClose();
    };

    return (
        <>
            <Modal
                open={isOpen}
                onClose={handleCancel}
                aria-labelledby="discharge-modal-title"
            >
                <div className={classes.paper}>
                    <Typography style={{ marginBottom: '35px' }} variant="h5" id="discharge-modal-title" gutterBottom>
                        Discharge Patient
                    </Typography>
                    <InputLabel>Discharge Date</InputLabel>
                    <TextField
                        className={classes.input}
                        //   label="Discharge Date"
                        type="date"
                        fullWidth
                        value={dischargeDate}
                        onChange={(event) => setDischargeDate(event.target.value)}
                    />
                    <TextField
                        className={classes.input}
                        label="Patient ID"
                        fullWidth
                        value={data.patientId}
                        onChange={(event) => setPatientId(event.target.value)}
                    />
                    <TextField
                        className={classes.input}
                        label="Room No"
                        fullWidth
                        value={roomNo}
                        style={{ marginBottom: '45px' }}
                        onChange={(event) => setRoomNo(event.target.value)}
                    />
                    {/* <TextField
          className={classes.input}
          label="Status"
          fullWidth
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        /> */}
                    <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        onClick={handleDischarge}
                    >
                        Discharge
                    </Button>
                    <Button
                        variant="contained"
                        color="default"
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                </div>
            </Modal>
            {/* <Snackbar
                open={snackbarOpen}
                autoHideDuration={5000}
                onClose={handleSnackbarClose}
            >
                <Alert severity="error">Already discharge started </Alert>
            </Snackbar> */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={5000}
                onClose={()=>setSnackbarOpen(false)}
            >
                <Alert severity="success">Updated discharge status</Alert>
            </Snackbar>
        </>
    );
}
