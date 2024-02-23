import Trip from './Trip.jsx';

export default function Trips({
  filter,
  selectedCity,
  handleFormOpen,
  handleTripSelected
}) {
  const listOfTrips = JSON.parse(localStorage.getItem('listOfTrips') || '');

  return (
    <section className="trips">
      {listOfTrips
        .filter(trip => trip.city.toLowerCase().includes(filter))
        .map((trip, index) => {
          const isActive = trip.city === selectedCity;

          return (
            <Trip
              key={index}
              trip={trip}
              isActive={isActive}
              handleTripSelected={handleTripSelected}
            />
          )
        })
      }

      <div className="new-trip" onClick={handleFormOpen}>
        <p>+</p>
        <p>Add trip</p>
      </div>
    </section>
  );
}