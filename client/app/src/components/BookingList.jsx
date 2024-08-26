import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  useTheme,
} from "@mui/material";

const BookingList = ({ bookings, openEditPopup, deleteBooking }) => {
  const theme = useTheme();
  return (
    <Grid container spacing={2}>
      {bookings.map((booking) => (
        <Grid item xs={12} key={booking.id}>
          <Card>
            <CardContent>
              <Typography variant="h6"> Reservation #{booking.id} </Typography>
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", color: theme.palette.primary.main }}
              >
                {booking.guest_name}
              </Typography>
              <Typography variant="body1">
                Number of People: {booking.head_count}
              </Typography>

              <Button
                variant="outlined"
                color="primary"
                onClick={() => openEditPopup(booking)}
                style={{ marginRight: "8px" }}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => deleteBooking(booking.id)}
              >
                Delete
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default BookingList;
