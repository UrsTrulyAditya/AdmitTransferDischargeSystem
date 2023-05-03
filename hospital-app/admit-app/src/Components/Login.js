import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite';
import appStore from '../Store/store';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@mui/material';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import RegisterModal from './RegisterModal';
import { loginAdmin, loginPatient, loginTpa } from '../Api/api';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';


const useStyles = makeStyles((theme) => ({

    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '55px',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        borderRadius:'10px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textField: {
        marginBottom: theme.spacing(2),
    },
}));

function Login(props) {
    const classes = useStyles();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setpasswordError] = useState(false);
    const [isError, setError] = useState(false);
    const [updateSuccess, setUpdateSuccess] = useState(false);


    const validateEmail = (value) => {
        let errorMessage = "";
        if (!value) {
            errorMessage = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
            errorMessage = "Invalid email address";
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

    useEffect(() => {
        // console.log(emailError, passwordError, 'errmsg');
    }, [emailError, passwordError]);


    const handleCreateAccount = () => {
        props.onClose();
        setIsRegisterModalOpen(true);
        console.log(isRegisterModalOpen, 'boolean');
    };
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };


    const login = async (selectedCard, email, password) => {
        let response;
        switch (selectedCard) {
            case 'Admin':
                response = await loginAdmin({ email, password });
                break;
            case 'Patient':
                response = await loginPatient({ email, password });
                break;
            case 'TPA':
                response = await loginTpa({ email, password });
                break;
            default:
                throw new Error('Invalid card selected');
        }
        return response;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { selectedCard } = props;

        try {
            const response = await login(selectedCard, email, password);
            // console.log(response,'response');
            if (response) {
                localStorage.setItem('token', response.token);
                localStorage.setItem('user', selectedCard);
                if(response.account){
                    appStore.setAccount(response.account);
                }
                resetForm();
                // console.log(`/${selectedCard}`);
                navigate(`/${selectedCard.toLowerCase()}`);
            }
        } catch (error) {
            setError(true);
            // console.log("1");
        }
    };

    const resetForm = () => {
        setEmail('');
        setPassword('');
    };

    const closeLoginModal = () => {
        resetForm();
        setEmailError(false);
        setpasswordError(false);
        props.onClose();
    }

    return (
        <div>
            <Modal
                className={classes.modal}
                open={props.isOpen}
                onClose={closeLoginModal}
            >
                <div className={classes.paper} style={{ width: '30vw' }}>
                    <h2>Login as {props.selectedCard}</h2>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid style={{ padding: '35px', width: '100%' }}>
                            <Grid item xs={12} style={{ marginBottom: '10px' }}>
                                <TextField
                                    label="Email"
                                    type="email"
                                    variant="outlined"
                                    value={email}
                                    onChange={handleEmailChange}
                                    error={emailError}
                                    helperText={emailError}
                                    required
                                    fullWidth
                                    onBlur={() => setEmailError(validateEmail(email))}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Password"
                                    type="password"
                                    variant="outlined"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    error={!!passwordError}
                                    helperText={passwordError}
                                    required
                                    fullWidth
                                    onBlur={() => setpasswordError(validatePassword(password))}
                                />
                            </Grid>

                        </Grid>
                        <Button type="submit" variant="contained" color="primary">
                            Login
                        </Button>
                        <Button>Forgot Password?</Button>
                        <p>Don't have an account?
                            <Button onClick={handleCreateAccount}>Create Account</Button></p>
                    </form>
                </div>
            </Modal>
            {isError && (<Snackbar
                open={isError}
                autoHideDuration={3000}
                onClose={() => setUpdateSuccess(false)}
                message="Bad Credentials"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert onClose={() => setError(false)} severity="error">
                    Bad Credentials
                </Alert>
            </Snackbar>)
            }
            {isRegisterModalOpen && <RegisterModal isOpen={isRegisterModalOpen} onRequestClose={() => setIsRegisterModalOpen(false)} />}
        </div>
    );
}

export default observer(Login);
