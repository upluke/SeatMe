const BookingForm = ({
  guestName,
  headCount,
  setGuestName,
  setHeadCount,
  addBooking,
}) => {
  return (
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
  );
};

export default BookingForm;
