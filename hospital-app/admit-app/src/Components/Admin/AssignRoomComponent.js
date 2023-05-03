import React, { useState } from "react";
import { updateRoomById } from "../../Api/updateApi";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

const AssignRoom = ({ roomId, roomNo, patientId, status, onClose }) => {
  const [patientInput, setPatientInput] = useState(patientId);
  const [statusInput, setStatusInput] = useState(status);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePatientChange = (e) => {
    setPatientInput(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatusInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await updateRoomById(roomId, {
        patientId: patientInput,
        status: statusInput,
      });
      onClose();
    } catch (error) {
      console.error("Error updating room", error);
    }

    setIsSubmitting(false);
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Assign Room {roomNo}</DialogTitle>
      <DialogContent>
        <TextField
          label="Patient ID"
          variant="outlined"
          fullWidth
          value={patientInput}
          onChange={handlePatientChange}
        />
        <Select
          label="Status"
          variant="outlined"
          fullWidth
          value={statusInput}
          onChange={handleStatusChange}
          disabled={isSubmitting}
          sx={{ mt: 2 }}
        >
          <MenuItem value="occupied">Occupied</MenuItem>
          <MenuItem value="available">Available</MenuItem>
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          Re-assign
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssignRoom;
