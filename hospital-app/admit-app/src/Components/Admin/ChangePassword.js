import React, { useState } from "react";
import axios from 'axios'
import {
    Button,
    TextField,
    makeStyles,
    FormControl,
    FormHelperText,
    Snackbar,
    Card,
    CardContent,
} from "@material-ui/core";
import Alert from "@mui/material/Alert";
import AdminHeader from "./AdminHeader";
import { updateAdminById,  } from "../../Api/updateApi";
import { getAdminById } from "../../Api/getApi"; 
import appStore from "../../Store/store";
// import { updateAdminById, getAdminById } from "../api/adminApi";

const useStyles = makeStyles((theme) => ({
    card: {
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
        borderRadius: "6px",
        width: "30%",
        height:'440px',
        maxHeight:320,
        margin: "auto",
        boxShadow: theme.shadows[5],
        borderRadius:'10px',
        padding:'10px',
        [theme.breakpoints.down("sm")]: {
            width: "80%",
        },
    },
    form: {
        display: "flex",
        flexDirection: "column",
        margin: theme.spacing(2),
        width:'70%',
        margin:'auto',
        padding:'10px'
    },
    button: {
        marginTop: theme.spacing(2),
    },
}));

const ChangePassword = () => {
    const classes = useStyles();
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [successsbarOpen, setsuccesssbarOpen] = useState(false);


    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("hlo");
        try {
          const admin = await getAdminById(appStore.account.adminId);
          console.log(admin,'admin')  
          if (admin.password !== oldPassword) {
            setErrorMessage("Incorrect old password");
            setSnackbarOpen(true);
          } else if (newPassword !== confirmPassword) {
            setErrorMessage("New password and confirm password do not match");
            setSnackbarOpen(true);
          } else {
            console.log(admin,'aaa');
            const payload = await {adminId:admin.adminId, email:admin.email, name: admin.name, password:newPassword}
            // await updateAdminById(payload);
            const res = await axios.put(`http://localhost:8562/admin/updateProfile`,payload);
            console.log(res,'res');
            setSuccessMessage("Password updated successfully");
            setsuccesssbarOpen(true);
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
          }
        } catch (error) {
          console.error(error);
          setErrorMessage("An error occurred. Please try again later.");
          setSnackbarOpen(true);
        }
    };

    return (
        <>
            <AdminHeader />
            <Card className={classes.card} style={{marginTop:'130px'}}>
                <CardContent>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <FormControl>
                            <TextField
                                required
                                label="Old Password"
                                type="password"
                                value={oldPassword}
                                style={{marginBottom:'20px'}}
                                onChange={(event) => setOldPassword(event.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                required
                                label="New Password"
                                type="password"
                                value={newPassword}
                                style={{marginBottom:'20px'}}
                                onChange={(event) => setNewPassword(event.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                required
                                label="Confirm New Password"
                                type="password"
                                value={confirmPassword}
                                style={{marginBottom:'20px'}}
                                onChange={(event) => setConfirmPassword(event.target.value)}
                            />
                        </FormControl>
                        <Button
                            className={classes.button}
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Change Password
                        </Button>
                    </form>
                    <Snackbar
                        open={snackbarOpen}
                        autoHideDuration={5000}
                        onClose={handleSnackbarClose}
                    >
                        <Alert severity="error">{errorMessage}</Alert>
                    </Snackbar>
                    <Snackbar
                        open={successsbarOpen}
                        autoHideDuration={5000}
                        onClose={handleSnackbarClose}
                    >
                        <Alert severity="success">{successMessage}</Alert>
                    </Snackbar>
                </CardContent>
            </Card >
        </>
    );
};

export default ChangePassword;
