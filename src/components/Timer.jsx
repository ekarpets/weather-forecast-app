import React, { useState, useRef, useEffect } from "react";

const defaultTimer = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0
};

export default function Timer({ startDate }) {
  const Ref = useRef(null);
  const [timer, setTimer] = useState(defaultTimer);
  const { days, hours, minutes, seconds } = timer;

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());

    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    const days = Math.floor((total / 1000 / 60 / 60) / 24);
    
    return {
      total,
      days,
      hours,
      minutes,
      seconds,
    };
  };
 
  const startTimer = (e) => {
    let { total, days, hours, minutes, seconds } = getTimeRemaining(e);
        
    if (total) {
      setTimer({ days, hours, minutes, seconds });
    }
  };
 
  const clearTimer = (e) => {
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => startTimer(e), 0);
    Ref.current = id;
  };

  useEffect(() => {
    clearTimer(startDate);
  }, [startDate]);

  return (
    <table className="aside__timer">
      <tbody>
        <tr className="aside__timer__values">
          <td>{days}</td>
          <td>{hours}</td>
          <td>{minutes}</td>
          <td>{seconds}</td>
        </tr>
        <tr className="aside__timer__units">
          <td>days</td>
          <td>hours</td>
          <td>minutes</td>
          <td>seconds</td>
        </tr>
      </tbody>
    </table>
  );
}