import { useState } from 'react';
import Trip from './Trip.jsx';
import { trips as defaultTrip } from '../assets/defaultListOfTrips.js'

export default function Trips({
  filter,
  selectedCity,
  handleFormOpen,
  handleTripSelected
}) {
  const [trips, setTrips] = useState(defaultTrip);

  return (
    <section className="trips">
      {trips
        .filter(trip => trip.city.toLowerCase().includes(filter))
        .sort((a, b) => Date.parse(a.startDate) - Date.parse(b.startDate))
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