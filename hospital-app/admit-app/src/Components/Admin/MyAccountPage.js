import { useState, useEffect } from 'react';
import { toJS } from 'mobx';
import { observer,inject } from "mobx-react";
import { makeStyles } from '@material-ui/core/styles';
import appStore from '../../Store/store';
import {
    Card,
    CardContent,
    Typography,
    TextField,
    IconButton,
    Button,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import AdminHeader from './AdminHeader';
import Footer from '../Footer';
import { getAdminById } from '../../Api/getApi';
import { updateAdminById } from '../../Api/updateApi';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 550,
        margin: 'auto',
        marginTop: theme.spacing(15),
        boxShadow: theme.shadows[5],
        borderRadius:'10px',
        padding:'10px'

    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    field: {
        marginBottom: theme.spacing(2),
    },
    actions: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: theme.spacing(2),
    },
}));

function MyAccountPage({ appStore }) {
    const classes = useStyles();
    const [user, setUser] = useState({});
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const account = appStore.account;
        setUser(account);
    }, []);

    const fetchUser = async(userID) => {
        const response = await getAdminById(userID);
        console.log(response);
    }
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
    };

    const handleSaveClick = async () => {
        try {
            await updateAdminById(user.adminId, user);
            setIsEditing(false);
            
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <AdminHeader />
            <Card className={classes.root}>
                <CardContent className={classes.content}>
                    <Typography variant="h5" gutterBottom>
                        My Account {!isEditing &&
                            <IconButton onClick={handleEditClick}>
                                <EditIcon />
                            </IconButton>}
                    </Typography>
                    <TextField
                        className={classes.field}
                        fullWidth
                        label="Full Name"
                        name="name"
                        value={user.name || ''}
                        disabled={!isEditing}
                        onChange={handleInputChange}
                    />
                    <TextField
                        className={classes.field}
                        fullWidth
                        label="Email"
                        name="email"
                        value={user.email || '-'}
                        disabled={true}
                        onChange={handleInputChange}
                    />
                    <TextField
                        className={classes.field}
                        fullWidth
                        label="Phone"
                        name="phone"
                        value={user.phone || '-'}
                        disabled={!isEditing}
                        onChange={handleInputChange}
                    />
                    <TextField
                        className={classes.field}
                        fullWidth
                        label="Address"
                        name="address"
                        value={user.address || '-'}
                        disabled={!isEditing}
                        onChange={handleInputChange}
                    />
                    <div className={classes.actions}>
                        {isEditing && (
                            <>
                                <Button color="secondary" onClick={handleCancelClick}>
                                    Cancel
                                </Button>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    onClick={handleSaveClick}
                                >
                                    Save
                                </Button>
                            </>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default inject("appStore")(observer(MyAccountPage));
