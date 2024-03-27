import { useState, useEffect } from 'react';
import { getCities } from '../api/api_cities';

const initialTrip = {
  "city": "",
  "startDate": "2024-01-01",
  "endDate": "2024-01-01",
  "image": ""
};

export default function Form({ handleFormClose }) {
  const listOfTrips = JSON.parse(localStorage.getItem('listOfTrips') || '');

  const dateFormater = (date) => date.toISOString().split('T')[0];

  const todayPlusNDays = (date, daysNumber) => {
    const dayToMSecs = 24 * 60 * 60 * 1000;
    const inputDate = new Date(date);
    const newDate = new Date(inputDate.getTime() + (daysNumber * dayToMSecs));
  
    return dateFormater(newDate);
  }

  const today = new Date();
  const [tripStartDate, setTripStartDate] = useState(today)
  const handleStartDayChange = (e) => setTripStartDate(e.target.value);

  const [cityList, setCityList] = useState([]);

  const getData = async () => {
    try {
      const result = await getCities();

      setCityList(result);
      localStorage.setItem('cityList', JSON.stringify(result));
    } catch(e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!localStorage['cityList']) {
      getData();
    } else {
      setCityList(JSON.parse(localStorage.getItem('cityList')));
    }
  }, []);

  const [newTrip, setNewTrip] = useState(initialTrip);

  const handleFormChange = (e) => {
    const targetValue = e.target;

    setNewTrip(prevTrip => ({
      ...prevTrip,
      [targetValue.name]: targetValue.value
    }));
  }

  const getImgUrl = (city) => {
    return cityList.find(el => el.name === city).imageUrl;
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleFormClose();

    const image = getImgUrl(newTrip.city);

    listOfTrips.push({ ...newTrip, image });
    listOfTrips.sort((a, b) => Date.parse(a.startDate) - Date.parse(b.startDate))
    localStorage.setItem('listOfTrips', JSON.stringify(listOfTrips));
  }

  return (
    <section className="form">
      <div className="form__header">
        <h3 className="">Create trip</h3>
        <button className="form__cross" onClick={handleFormClose}>x</button>
      </div>
  
      <form onSubmit={e => handleFormSubmit(e)} onChange={e => handleFormChange(e)}>
        <div className="form__body">
          <label htmlFor="form__city"><span>* </span>City</label>
          <input
            list="form__city__list"
            id="form__city"
            name="city"
            placeholder='Please select a city'
            required
          />
          <datalist id="form__city__list">
            {cityList.map((item, index) => (
              <option value={item.name} key={index}></option>
            ))}
          </datalist>
          <label htmlFor="form__startDate"><span>* </span>Start date</label>
          <input
            id="form__startDate"
            name="startDate"
            type="date"
            min={todayPlusNDays(today, 1)}
            max={todayPlusNDays(today, 15)}
            onChange={e => handleStartDayChange(e)}
            value={tripStartDate}
            required
          />

          <label htmlFor="form__endDate"><span>* </span>End date</label>
          <input
            id="form__endDate"
            name="endDate"
            type="date"
            min={todayPlusNDays(tripStartDate, 0)}
            max={todayPlusNDays(today, 15)}
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