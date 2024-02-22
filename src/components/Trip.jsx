export default function Trip({ trip, isActive, handleTripSelected }) {
  const { city, startDate, endDate, image } = trip;
  const parsedDate = (date) =>  date.split('-').reverse().join('.');

  return (
    <div
      className={`trip ${isActive && 'active'}`}
      onClick={() => handleTripSelected(trip)}
      value={trip}
    >
      <img
        src={image}
        alt={`${city}`}
        height="200"
        className="trip__image"
      />
      <div className="trip__info">
        <p>{city}</p>
        <p className="trip__dates">
          {parsedDate(startDate)} - {parsedDate(endDate)}
        </p>
      </div>
    </div>      
  );
}
