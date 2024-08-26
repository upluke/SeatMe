import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
} from "@mui/material";

const EditBookingPopup = ({
  isEditing,
  newGuestName,
  setNewGuestName,
  newHeadCount,
  setNewHeadCount,
  updateBooking,
  closeEditPopup,
}) => {
  if (!isEditing) return null;

  return (
    <Dialog open={isEditing} onClose={closeEditPopup} maxWidth="sm" fullWidth>
      <DialogTitle align="center">Edit Booking</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={2}>
          <TextField
            label="Name"
            variant="outlined"
            value={newGuestName}
            onChange={(e) => setNewGuestName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Number of people"
            type="number"
            variant="outlined"
            value={newHeadCount}
            onChange={(e) => setNewHeadCount(e.target.value)}
            fullWidth
          />
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button variant="contained" color="primary" onClick={updateBooking}>
              Update
            </Button>
            <Button variant="outlined" onClick={closeEditPopup}>
              Cancel
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default EditBookingPopup;
