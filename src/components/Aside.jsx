import { useEffect, useState } from "react";

import Timer from "./Timer";
import avatar from "../assets/images/icons/default-avatar.jpeg"

import { getCurrentWeather } from '../api/api.js';
import { imageSrc } from '../assets/conditionImgHelper.js';

export default function Aside ({ currentTrip }) {
  const { city, startDate } = currentTrip;
  const today = new Date().toLocaleString('en-us', { weekday: 'long' });

  const [condition, setCondition] = useState({temp: 0, icon: 'cloudy'});

  const getWeather = async () => {
    try {
      const weatherInfo = await getCurrentWeather(city);
      const currentDay = weatherInfo.days[0];

      if ('Error' in weatherInfo) throw new Error();

      setCondition({temp: currentDay.temp, icon: currentDay.icon});
      imageSrc(currentDay.icon);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getWeather();
  }, [city]);

  return (
    <aside className="aside">
      <div className="avatar">
        <img
          className="avatar__image"
          src={avatar}
          alt="Avatar"
          height="50" width="50"
        />
      </div>

      <div className="aside__weather">
        <h2>{today}</h2>
        <div className="aside__weather__info">
          <img
            src={imageSrc(condition.icon)}
            alt="Weather"
            height="60" width="60"
          />
          <p>
            {Math.round(condition.temp)} <sup><small>&deg;</small></sup>
          </p> 
        </div>
        <h3>{city}</h3>
      </div>
      
      <Timer startDate={startDate} />
    </aside>
  );
}
