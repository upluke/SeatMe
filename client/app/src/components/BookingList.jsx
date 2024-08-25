/* eslint-disable react/prop-types */
const BookingList = ({ bookings, openEditPopup, deleteBooking }) => {
  return (
    <div>
      {bookings.map((booking) => (
        <div key={booking.id}>
          <p>Name: {booking.guest_name} </p>
          <p>Number of People: {booking.head_count}</p>

          <button onClick={() => openEditPopup(booking)}>Edit</button>
          <button onClick={() => deleteBooking(booking.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default BookingList;
