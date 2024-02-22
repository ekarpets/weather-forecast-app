import { useEffect, useState } from "react";
import { getFutureWeather } from '../api/api.js';
import { imageSrc } from '../assets/conditionImgHelper.js';

const week = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

export default function WeatherBlock ({ currentTrip }) {
  const { city, startDate, endDate } = currentTrip;

  const [weather, setWeather] = useState([
    {"day": "2024-02-24", "tempmax": 12, "tempmin": 4, "condition": 'snow'},
    {"day": "2024-02-25", "tempmax": 10, "tempmin": 4, "condition": 'cloudy'},
    {"day": "2024-02-26", "tempmax": 12, "tempmin": 4, "condition": 'rain'},
    {"day": "2024-02-27", "tempmax": 7, "tempmin": 4, "condition": 'clear-day'},
    {"day": "2024-02-28", "tempmax": 12, "tempmin": 4, "condition": 'rain'},
    {"day": "2024-02-29", "tempmax": 5, "tempmin": 4, "condition": 'partly-cloudy-day'},
    {"day": "2024-03-01", "tempmax": 12, "tempmin": 0, "condition": 'rain'},
    {"day": "2024-03-02", "tempmax": 12, "tempmin": 4, "condition": 'cloudy'},
    {"day": "2024-03-23", "tempmax": 4, "tempmin": 4, "condition": 'rain'},
    {"day": "2024-03-04", "tempmax": 12, "tempmin": 4, "condition": 'rain'},
  ]);
  
  // const getWeather = async () => {
  //   try {
  //     const weatherInfo = await getFutureWeather(city, startDate, endDate);
  //     const setectedDays = weatherInfo.days;

  //     console.log(setectedDays);

  //     if ('Error' in weatherInfo) {
  //       throw new Error();
  //     }
  //     const info = setectedDays.map(day => ({
  //       day: new Date(day.datetime).getDay(),
  //       tempmax: Math.round(day.tempmax),
  //       tempmin: Math.round(day.tempmin),
  //       condition: day.icon
  //     }))

  //     setWeather(info);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  
  // useEffect(() => {
  //   getWeather();
  // }, []);

  return (
    <section>
      <h2>Week</h2>
      <div className="weather-blocks">
        {weather.map((info, index) => {
          const { day, tempmax, tempmin, condition } = info;

          return index < 7 ? (
            <div className="weather-block" key={day}>
              <p className="weather-block__day">{week[day]}</p>
              <img
                src={imageSrc(condition)}
                alt="Weather condition"
                height="70" width="70"
              />
              <p>{tempmax}&deg; / {tempmin}&deg;</p>
            </div>
          ) : ''
        })}
      </div>          
    </section>
  )
}