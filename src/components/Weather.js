import React from 'react';
import './Weather.css';

const Weather = (props) => {
  const { forecast, temperature } = props;

  return (
    <span className="CM-weather-forecast">
      Weather - {forecast ? forecast : 'Unknown'}
      {
        temperature &&
        <span>, {temperature}&deg;C</span>
      }
    </span>
  );
};

export default Weather;
