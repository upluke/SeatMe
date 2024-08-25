import { useEffect, useState } from "react";
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

  const fetchBookings = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/bookings/");
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
      const response = await fetch(
        "http://127.0.0.1:8000/api/bookings/create/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        }
      );

      const data = await response.json();
      // console.log(">>>", data);
      setBookings((prev) => [...prev, data]);
      setGuestName("");
      setHeadCount(0);
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
        `http://127.0.0.1:8000/api/bookings/${currentBooking.id}`,
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

    const isConfirmed = window.confirm("Are you sure you want to delete this booking?");
    if (!isConfirmed) {
      return;  
    }
    
    try {
      await fetch(`http://127.0.0.1:8000/api/bookings/${pk}`, {
        method: "DELETE",
      });

      setBookings((prev) => prev.filter((booking) => booking.id !== pk));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h1>Booking System</h1>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={guestName}
          onChange={(e) => setGuestName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Number of people"
          value={headCount}
          onChange={(e) => setHeadCount(Number(e.target.value))}
        />
        <button onClick={addBooking}>Add Booking</button>
      </div>

      {bookings.map((booking) => (
        <div key={booking.id}>
          <p>Name: {booking.guest_name} </p>
          <p>Number of People: {booking.head_count}</p>

          <button onClick={() => openEditPopup(booking)}>Edit</button>
          <button onClick={() => deleteBooking(booking.id)}>Delete</button>
        </div>
      ))}

      {isEditing && (
        <div className="popup-container">
          <div className="popup-window">
            <h2>Edit Booking</h2>
            <input
              type="tesxt"
              value={newGuestName}
              onChange={(e) => setNewGuestName(e.target.value)}
              autoFocus
            />
            <input
              type="number"
              value={newHeadCount}
              onChange={(e) => setNewHeadCount(e.target.value)}
              autoFocus
            />
            <button onClick={updateBooking}>Update</button>
            <button onClick={closeEditPopup}>Cancel</button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
