import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [bookings, setBookings] = useState([]);
  const [guestName, setGusetName] = useState("");
  const [headCount, setHeadCount] = useState(0);

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
    } catch (err) {
      console.log(err);
    }
  };

  const updateBooking = async (fieldToBeUpdated, booking) => {
    const target_pk = booking.id;
    let bookingData;
    if (fieldToBeUpdated === "guestName") {
      bookingData = {
        guest_name: newGuestName,
        head_count: booking.head_count,
      };
    } else {
      bookingData = {
        guest_name: booking.guest_name,
        head_count: newHeadCount,
      };
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/bookings/${target_pk}`,
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
          if (booking.id === target_pk) {
            return data;
          } else {
            return booking;
          }
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const deleteBooking = async (pk) => {
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
          onChange={(e) => setGusetName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Number of people"
          onChange={(e) => setHeadCount(e.target.value)}
        />
        <button onClick={addBooking}>Add Booking</button>
      </div>
      {bookings.map((booking) => (
        <div key={booking.id}>
          <p>Name: {booking.guest_name} </p>
          <p>Number of People: {booking.head_count}</p>
          <input
            type="text"
            placeholder="New guest name"
            onChange={(e) => setNewGuestName(e.target.value)}
          />
          <button onClick={() => updateBooking("guestName", booking)}>
            Change Name
          </button>
          <input
            type="number"
            placeholder="New head count"
            onChange={(e) => setNewHeadCount(e.target.value)}
          />
          <button onClick={() => updateBooking("headCount", booking)}>
            Change Head Count
          </button>
          <button onClick={() => deleteBooking(booking.id)}>Delete</button>
        </div>
      ))}
    </>
  );
}

export default App;
