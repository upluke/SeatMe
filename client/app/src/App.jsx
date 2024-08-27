import { useEffect, useState } from "react";
import BookingForm from "./components/BookingForm";
import BookingList from "./components/BookingList";
import EditBookingPopup from "./components/EditBookingPopup";
import { Container, Grid, Typography, Box } from "@mui/material";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import { API_BASE_URL } from "./config";

import "./App.css";

function App() {
  const [bookings, setBookings] = useState([]);
  const [guestName, setGuestName] = useState("");
  const [headCount, setHeadCount] = useState(1);

  const [isEditing, setIsEditing] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);

  const [newGuestName, setNewGuestName] = useState("");
  const [newHeadCount, setNewHeadCount] = useState(0);

  useEffect(() => {
    fetchBookings();
  }, []);

  // test url: http://127.0.0.1:8000/api/bookings/

  const fetchBookings = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings/`);
      const data = await response.json();
      // console.log(data);
      setBookings(data);
    } catch (err) {
      console.log(err);
    }
  };

  const addBooking = async () => {
    const bookingData = {
      guest_name: guestName,
      head_count: headCount,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/bookings/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();
      // console.log(">>>", data);
      setBookings((prev) => [...prev, data]);
      setGuestName("");
      setHeadCount(1);
    } catch (err) {
      console.log(err);
    }
  };

  const openEditPopup = (booking) => {
    setCurrentBooking(booking);
    setNewGuestName(booking.guest_name);
    setNewHeadCount(booking.head_count);
    setIsEditing(true);
  };

  const closeEditPopup = () => {
    setIsEditing(false);
    setCurrentBooking(null);
  };

  const updateBooking = async () => {
    const bookingData = {
      guest_name: newGuestName,
      head_count: newHeadCount,
    };

    try {
      const response = await fetch(
        `${API_BASE_URL}/bookings/${currentBooking.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        }
      );
      const data = await response.json();
      setBookings((prev) =>
        prev.map((booking) => {
          if (booking.id === currentBooking.id) {
            return data;
          } else {
            return booking;
          }
        })
      );
      closeEditPopup();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteBooking = async (pk) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this booking?"
    );
    if (!isConfirmed) {
      return;
    }

    try {
      await fetch(`${API_BASE_URL}/bookings/${pk}`, {
        method: "DELETE",
      });

      setBookings((prev) => prev.filter((booking) => booking.id !== pk));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box mb={7}>
        <Typography variant="h3" align="center" gutterBottom>
          <ContentPasteIcon fontSize="large" sx={{ mr: 2 }} />
          Reservation
        </Typography>
      </Box>

      <Grid container spacing={7}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <BookingForm
              guestName={guestName}
              headCount={headCount}
              setGuestName={setGuestName}
              setHeadCount={setHeadCount}
              addBooking={addBooking}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              maxHeight: "600px",
              overflowY: "auto",
            }}
          >
            <BookingList
              bookings={bookings}
              openEditPopup={openEditPopup}
              deleteBooking={deleteBooking}
            />
          </Box>
        </Grid>
      </Grid>

      <EditBookingPopup
        isEditing={isEditing}
        newGuestName={newGuestName}
        setNewGuestName={setNewGuestName}
        newHeadCount={newHeadCount}
        setNewHeadCount={setNewHeadCount}
        updateBooking={updateBooking}
        closeEditPopup={closeEditPopup}
      />
    </Container>
  );
}

export default App;
