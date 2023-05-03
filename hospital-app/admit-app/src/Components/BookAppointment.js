import React from 'react';
import {
    Modal,
    Box,
    Typography,
    TextField,
    Button,
} from '@mui/material';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const BookAppointment = ({ isOpen, onClose }) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        onClose();
        // TODO: handle form submission
    };

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="book-appointment-modal-title"
            aria-describedby="book-appointment-modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    borderRadius: '10px',
                    p: 4,
                }}
            >
                <div style={{ marginBottom: '15px', textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
                    <img width={'60px'} src='http://res.cloudinary.com/daari0y7l/image/upload/v1682171410/IMG_20230422_175501_182_yim1qw.png' />
                    <Typography
                        variant="h5"
                        color="inherit"
                        component="div"
                        style={{ fontWeight: 'bold', color: '#3d7ba2' }}
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
                            <span style={{ fontSize: '20px', color: '#000000', fontWeight: 'bolder' }}>HealthSure</span>
                            <span style={{ fontSize: '15px' }}>Hospitals</span>
                        </div>
                    </Typography>
                </div>
                <Typography id="book-appointment-modal-title" variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                    Book an appointment
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Patient Name"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Email Address"
                        type="email"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Mobile Number"
                        type="tel"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Select Date"
                        type="date"
                        defaultValue={new Date().toISOString().slice(0, 10)}
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <FormControl fullWidth>
                        <InputLabel id="select-slot-label">Select Slot</InputLabel>
                        <Select
                            labelId="select-slot-label"
                            id="select-slot"
                            label="Select Slot"
                        >
                            <MenuItem value="morning">Morning Slot (9 AM)</MenuItem>
                            <MenuItem value="afternoon">Afternoon Slot (2 PM)</MenuItem>
                            <MenuItem value="evening">Evening Slot (6 PM)</MenuItem>
                        </Select>
                    </FormControl>
                    <Button type="submit" variant="contained" fullWidth style={{ marginTop: '15px', marginBottom: '15px' }}>
                        Book Appointment
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default BookAppointment;
