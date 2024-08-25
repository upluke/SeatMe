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
  );
};

export default EditBookingPopup;
