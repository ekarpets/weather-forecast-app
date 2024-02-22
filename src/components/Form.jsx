import { useState, useEffect } from 'react';
import { getCities } from '../api/api_cities';
import { trips } from '../assets/defaultListOfTrips.js';

export default function Form({ handleFormClose }) {
  const dateFormater = (date) => date.toISOString().split('T')[0];

  const todayPlusNDays = (date, daysNumber) => {
    const dayToMSecs = 24 * 60 * 60 * 1000;
    const inputDate = new Date(date);
    const newDate = new Date(inputDate.getTime() + (daysNumber * dayToMSecs));
  
    return dateFormater(newDate);
  }

  const today = new Date();
  // const [trips, setTrips] = useState(defaultTrip);

  const [tripStartDate, setTripStartDate] = useState(today)
  const handleStartDayChange = (e) => setTripStartDate(e.target.value);

  const [cityList, setCityList] = useState([]);

  const getData = async () => {
    try {
      const result = await getCities();

      setCityList(result);
      console.log(result)
    } catch(e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (cityList.length === 0) {
      getData();
    }
  }, [cityList.length]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleFormClose();

    const targetValue = e.target;
    const city = targetValue.form__city.value;
    const startDate = targetValue.form__startDate.value;
    const endDate = targetValue.form__endDate.value;

    const newTrip = { city, startDate, endDate };

    trips.push(newTrip)
    console.log(newTrip)
  }

  return (
    <section className="form">
      <div className="form__header">
        <h3 className="">Create trip</h3>
        <button className="form__cross" onClick={handleFormClose}>x</button>
      </div>
  
      <form onSubmit={e => handleFormSubmit(e)}>
        <div className="form__body">
          <label htmlFor="form__city"><span>* </span>City</label>
          <input
            list="form__city__list"
            id="form__city"
            name="form__city"
            placeholder='Please select a city'
            required
          />
          <datalist id="form__city__list">
            {cityList.map((item, index) => (
              <option value={item.name} key={index}></option>
            ))}
            <option value="Paris"></option>
            <option value="London"></option>
          </datalist>

          <label htmlFor="form__startDate"><span>* </span>Start date</label>
          <input
            id="form__startDate"
            type="date"
            min={todayPlusNDays(today, 1)}
            max={todayPlusNDays(today, 16)}
            onChange={e => handleStartDayChange(e)}
            value={tripStartDate}
            required
          />

          <label htmlFor="form__endDate"><span>* </span>End date</label>
          <input
            id="form__endDate"
            type="date"
            min={todayPlusNDays(tripStartDate, 0)}
            max={todayPlusNDays(tripStartDate, 15)}
            required
          />
        </div>
            
        <div className="form__buttons">
          <button type="button" onClick={handleFormClose}>Cancel</button>
          <button type="submit">Save</button>
        </div>
      </form>
    </section>
  );
}