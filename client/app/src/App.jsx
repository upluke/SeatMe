import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [bookings, setBookings] = useState([]);

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

  return (
    <>
      <h1>Booking System</h1>
      <div>
        <input type="text" placeholder="Name" />
        <input type="number" placeholder="Number of people" />
        <button>Add Booking</button>
      </div>
      {bookings.map((booking) => (
        <div key={booking.id}>
          <p>Name: {booking.guess_name} </p>
          <p>Number of People: {booking.head_count}</p>
        </div>
      ))}
    </>
  );
}

export default App;
