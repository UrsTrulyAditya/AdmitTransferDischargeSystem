import React, { useEffect, useState } from 'react';
import { Button, Modal, makeStyles } from '@material-ui/core';
// import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import { registerAdmin, registerPatient, registerTpa } from '../Api/api';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',

    },
  },
  formControl: {
    margin: theme.spacing(3),
  },
  button: {
    marginTop: theme.spacing(2),
    width: '150px'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '55%',
    margin: 'auto'
  },
  paper: {
    position: 'absolute',
    width: 650,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4, 5, 4),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxHeight: '80vh',
    maxWidth: '70%',
    // overflow: 'auto',
    scrollBehavior: 'smooth',
    borderRadius: '10px',
  },
}));

function RegisterModal({ isOpen, onRequestClose }) {
  const [open, setOpen] = useState(true);
  const classes = useStyles();
  // const history = useNavigate();

  const [formType, setFormType] = useState('patient');
  const [adminId, setAdminId] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminName, setAdminName] = useState('');
  const [patientId, setPatientId] = useState('');
  const [patientPassword, setPatientPassword] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientProblem, setPatientProblem] = useState('');
  const [patientMobile, setPatientMobile] = useState('');
  const [patientRoomNo, setPatientRoomNo] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [tpaId, setTpaId] = useState('');
  const [tpaPassword, setTpaPassword] = useState('');
  const [tpaName, setTpaName] = useState('');
  const [tpaHospitalId, setTpaHospitalId] = useState('');
  const [tpaEmail, setTpaEmail] = useState('');
  // const [open, setOpen] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setpasswordError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [isError, setError] = useState(false);
  const [pNameError, setPNameError] = useState(false);
  const [pAgeError, setPAgeError] = useState(false);
  const [prbError, setProbError] = useState(false);
  const [mobError, setMobError] = useState(false);
  const [pEmailError, setPemailError] = useState(false);
  const [patPassError, setPatPassError] = useState(false);
  const [tpaEmailError, setTpaEmailError] = useState(false);
  const [tpaPassError, setTpaPassError] = useState(false);
  const [tpahospIdError, setTpahospIdError] = useState(false);
  const [tpaNameError, setTpaNameError] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);


  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formType === 'admin') {
      const adminData = {
        id: adminId,
        password: adminPassword,
        email: adminEmail,
        name: adminName
      };

      registerAdmin(adminData).then((response) => {
        setSnackbarOpen(true);
        setTimeout(() => {
          resetAdminForm();
          onRequestClose();
        }, 1500);
        // onRequestClose();
        console.log(response);
      }).catch((error) => {
        console.log(error);
      });
    } else if (formType === 'patient') {
      const patientData = {
        id: patientId,
        password: patientPassword,
        name: patientName,
        age: patientAge,
        problem: patientProblem,
        mobile: patientMobile,
        roomNo: patientRoomNo,
        email: patientEmail
      };

      registerPatient(patientData).then((response) => {
        setSnackbarOpen(true);
        setTimeout(() => {
          resetPatientForm();
          onRequestClose();
        }, 1500);
        
        console.log(response);
      }).catch((error) => {
        console.log(error);
      });
    } else if (formType === 'tpa') {
      const tpaData = {
        id: tpaId,
        password: tpaPassword,
        name: tpaName,
        hospitalId: tpaHospitalId,
        email: tpaEmail
      };

      registerTpa(tpaData).then((response) => {
        setSnackbarOpen(true);
        setTimeout(() => {
          resetTPAForm();
          onRequestClose();
        }, 1500);
        console.log(response);
      }).catch((error) => {
        console.log(error);
      });
    }
  };


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const validateName = (value) => {
    let errorMessage = "";
    if (!value) {
      errorMessage = "Name is required";
    }
    return errorMessage;
  };

  const validatePName = (value) => {
    let errorMessage = "";
    if (!value) {
      errorMessage = "Name is required";
    }
    return errorMessage;
  };

  const validateTpaName = (value) => {
    let errorMessage = "";
    if (!value) {
      errorMessage = "Name is required";
    }
    return errorMessage;
  };

  const validatePAge = (value) => {
    let errorMessage = "";
    if (!value) {
      errorMessage = "Age is required";
    } else if (value > 120 || value < 1) {
      errorMessage = "Invalid age";
    }
    return errorMessage;
  };

  const validateProblem = (value) => {
    let errorMessage = "";
    if (!value) {
      errorMessage = "Problem is required";
    }
    return errorMessage;
  };

  const validateMobile = (value) => {
    let errorMessage = "";
    if (!value) {
      errorMessage = "Mobile number is required";
    } else if (value.length > 10) {
      errorMessage = "Mobile number invalid";
    }
    return errorMessage;
  };


  const validateEmail = (value) => {
    let errorMessage = "";
    if (!value) {
      errorMessage = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      errorMessage = "Invalid email address";
    }
    return errorMessage;
  };

  const validatePemail = (value) => {
    let errorMessage = "";
    if (!value) {
      errorMessage = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      errorMessage = "Invalid email address";
    }
    return errorMessage;
  };

  const validateTpaEmail = (value) => {
    let errorMessage = "";
    if (!value) {
      errorMessage = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      errorMessage = "Invalid email address";
    }
    return errorMessage;
  };

  const validateTpaHospId = (value) => {
    let errorMessage = "";
    if (!value) {
      errorMessage = "Id is required";
    }
    return errorMessage;
  };
  const validatePassword = (value) => {
    let errorMessage = "";
    if (!value) {
      errorMessage = "Password is required";
    } else if (value.length < 6) {
      errorMessage = "Password should be at least 6 characters";
    }
    return errorMessage;
  };

  const validatePatPass = (value) => {
    let errorMessage = "";
    if (!value) {
      errorMessage = "Password is required";
    } else if (value.length < 6) {
      errorMessage = "Password should be at least 6 characters";
    }
    return errorMessage;
  };

  const validateTpaPassword = (value) => {
    let errorMessage = "";
    if (!value) {
      errorMessage = "Password is required";
    } else if (value.length < 6) {
      errorMessage = "Password should be at least 6 characters";
    }
    return errorMessage;
  };

  const resetAdminForm = () => {
    setAdminName('');
    setAdminEmail('');
    setAdminPassword('');
  };

  const resetTPAForm = () => {
    setTpaName('');
    setTpaHospitalId('');
    setTpaEmail('');
    setTpaPassword('');
  };

  const resetPatientForm = () => {
    setPatientName('');
    setPatientAge('');
    setPatientMobile('');
    setPatientProblem('');
    setPatientEmail('');
    setPatientPassword('');
  };

  return (
    <>
      <div className="register">

        <Modal
          className={classes.modal}
          open={true}
          // onClose={props.onClose}
          disableScrollLock
        >
          <div className={classes.paper}>
            {/* <Grid container spacing={2}>
              <Grid item xs={12} sm={6}> */}
            <form className={classes.root} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: 'auto' }}>

              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Select account type:</FormLabel>
                <RadioGroup
                  aria-label="accountType"
                  name="accountType"
                  value={formType}
                  onChange={(event) => setFormType(event.target.value)}
                >
                  <FormControlLabel value="admin" control={<Radio />} label="Admin" />
                  <FormControlLabel value="patient" control={<Radio />} label="Patient" />
                  <FormControlLabel value="tpa" control={<Radio />} label="TPA" />
                </RadioGroup>
              </FormControl>
              {formType === 'admin' && (
                <>
                  <TextField
                    label="Name"
                    variant="outlined"
                    value={adminName}
                    error={nameError}
                    helperText={nameError}
                    onBlur={() => setNameError(validateName(adminName))}
                    style={{ width: '75%' }}
                    onChange={(event) => setAdminName(event.target.value)}
                  />

                  <TextField
                    label="Email"
                    type="email"
                    variant="outlined"
                    value={adminEmail}
                    error={emailError}
                    helperText={emailError}
                    onBlur={() => setEmailError(validateEmail(adminEmail))}
                    style={{ width: '75%' }}
                    onChange={(event) => setAdminEmail(event.target.value)}
                  />

                  <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    value={adminPassword}
                    error={passwordError}
                    helperText={passwordError}
                    onBlur={() => setpasswordError(validatePassword(adminPassword))}
                    style={{ width: '75%' }}
                    onChange={(event) => setAdminPassword(event.target.value)}
                  />
                </>


              )}
              {formType === 'patient' && (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-around' }}>

                    <TextField
                      label="Name"
                      variant="outlined"
                      value={patientName}
                      error={pNameError}
                      helperText={pNameError}
                      onBlur={() => setPNameError(validatePName(patientName))}
                      onChange={(event) => setPatientName(event.target.value)}
                    />
                    {/* <TextField
                        label="Patient ID"
                        variant="outlined"
                        value={patientId}
                        onChange={(event) => setPatientId(event.target.value)}
                      /> */}
                    <TextField
                      label="Age"
                      type="number"
                      variant="outlined"
                      value={patientAge}
                      error={pAgeError}
                      helperText={pAgeError}
                      onBlur={() => setPAgeError(validatePAge(patientAge))}
                      onChange={(event) => setPatientAge(event.target.value)}
                    />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <TextField
                      label="Problem"
                      variant="outlined"
                      value={patientProblem}
                      error={prbError}
                      helperText={prbError}
                      onBlur={() => setProbError(validateProblem(patientProblem))}
                      onChange={(event) => setPatientProblem(event.target.value)}
                    />
                    <TextField
                      label="Mobile"
                      type="tel"
                      variant="outlined"
                      value={patientMobile}
                      error={mobError}
                      helperText={mobError}
                      onBlur={() => setMobError(validateMobile(patientMobile))}
                      onChange={(event) => setPatientMobile(event.target.value)}
                      inputProps={{ maxLength: 10 }}
                    />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    {/* <TextField
                      label="Room No."
                      variant="outlined"
                      value={patientRoomNo}
                      onChange={(event) => setPatientRoomNo(event.target.value)}
                    /> */}
                    <TextField
                      label="Email"
                      type="email"
                      variant="outlined"
                      value={patientEmail}
                      error={pEmailError}
                      helperText={pEmailError}
                      onBlur={() => setPemailError(validatePemail(patientEmail))}
                      onChange={(event) => setPatientEmail(event.target.value)}
                    />
                    <TextField
                      label="Password"
                      type="password"
                      variant="outlined"
                      value={patientPassword}
                      error={patPassError}
                      helperText={patPassError}
                      onBlur={() => setPatPassError(validatePatPass(patientPassword))}
                      onChange={(event) => setPatientPassword(event.target.value)}
                    />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    {/* <TextField
                      label="Password"
                      type="password"
                      variant="outlined"
                      value={patientPassword}
                      error={patPassError}
                      helperText={patPassError}
                      onBlur={() => setPatPassError(validatePatPass(patientPassword))}
                      onChange={(event) => setPatientPassword(event.target.value)}
                    /> */}
                  </div>
                </>
              )}
              {formType === 'tpa' && (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <TextField
                      label="TPA Name"
                      variant="outlined"
                      value={tpaName}
                      error={tpaNameError}
                      helperText={tpaNameError}
                      onBlur={() => setTpaNameError(validateTpaName(tpaName))}
                      onChange={(event) => setTpaName(event.target.value)}
                    />
                    {/* <TextField
                        label="TPA ID"
                        variant="outlined"
                        value={tpaId}
                        onChange={(event) => setTpaId(event.target.value)}
                      /> */}
                    <TextField
                      label="Hospital ID"
                      variant="outlined"
                      value={tpaHospitalId}
                      error={tpahospIdError}
                      helperText={tpahospIdError}
                      onBlur={() => setTpahospIdError(validateTpaHospId(tpaName))}
                      onChange={(event) => setTpaHospitalId(event.target.value)}
                    />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <TextField
                      label="Email"
                      type="email"
                      variant="outlined"
                      value={tpaEmail}
                      error={tpaEmailError}
                      helperText={tpaEmailError}
                      onBlur={() => setTpaEmailError(validateTpaEmail(tpaEmail))}
                      onChange={(event) => setTpaEmail(event.target.value)}
                    />
                    <TextField
                      label="Password"
                      type="password"
                      variant="outlined"
                      value={tpaPassword}
                      error={tpaPassError}
                      helperText={tpaPassError}
                      onBlur={() => setTpaEmailError(validateTpaPassword(tpaPassword))}
                      onChange={(event) => setTpaPassword(event.target.value)}
                    />
                  </div>
                </>
              )}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                {formType == "admin" &&
                  <Button className={classes.button} disabled={(adminEmail == false || adminPassword == false) || (emailError || passwordError)} variant="contained" color="primary" type="submit">
                    Register
                  </Button>}
                {formType == "patient" &&
                  <Button className={classes.button} disabled={(patientEmail == false || patientPassword == false) || (pEmailError || patPassError)} variant="contained" color="primary" type="submit">
                    Register
                  </Button>}
                {formType == "tpa" &&
                  <Button className={classes.button} disabled={(tpaEmail == false || tpaPassword == false) || (tpaEmailError || tpaPassError)} variant="contained" color="primary" type="submit">
                    Register
                  </Button>}
                <Button onClick={onRequestClose} className={classes.button} style={{ marginLeft: '10px' }} variant="outlined" color="secondary" type="submit">
                  Cancel
                </Button>

              </div>
            </form>

            {/* </Grid>

            </Grid> */}
          </div>
        </Modal>
      </div>
      <Snackbar
        style={{marginLeft:'1200px'}}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert severity="success">"Registered successfully"</Alert>
      </Snackbar>
    </>
  );
}

export default RegisterModal;
