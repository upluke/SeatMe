import { TextField, Button, Box, Typography } from "@mui/material";

const BookingForm = ({
  guestName,
  headCount,
  setGuestName,
  setHeadCount,
  addBooking,
}) => {
  return (
    <Box mb={3}>
      <Typography variant="body1" align="left">
        Please enter your name and how many people below:
      </Typography>
      <TextField
        label="Name"
        variant="outlined"
        value={guestName}
        onChange={(e) => setGuestName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        type="number"
        placeholder="Number of people"
        variant="outlined"
        value={headCount}
        onChange={(e) => setHeadCount(Number(e.target.value))}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={addBooking}
        fullWidth
        style={{ marginTop: "16px" }}
      >
        Add Booking
      </Button>
    </Box>
  );
};

export default BookingForm;
