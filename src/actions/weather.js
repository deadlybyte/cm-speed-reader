import 'cross-fetch/polyfill';

import { FETCH_WEATHER_FORECAST_REQUEST, FETCH_WEATHER_FORECAST_SUCCESS, FETCH_WEATHER_FORECAST_FAILURE } from '../constants/weather';

const fetchWeatherForecastRequest = (longitude, latitude) => {
  return {
    type: FETCH_WEATHER_FORECAST_REQUEST,
    longitude,
    latitude
  };
};

const fetchWeatherForeacastSuccess = (body) => {
  return {
    type: FETCH_WEATHER_FORECAST_SUCCESS,
    body
  };
};

const fetchWeatherForecastFailure = (ex) => {
  return {
    type: FETCH_WEATHER_FORECAST_FAILURE,
    ex
  };
}

export const fetchWeatherForecast = (longitude, latitude) => {
  return async dispatch => {
    dispatch(fetchWeatherForecastRequest(longitude, latitude));
    try {
      const response = await fetch(`${process.env.REACT_APP_OPEN_WEATHER_MAP_BASE_URL}/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&APPID=${process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY}`);
      const json = await response.json();
      dispatch(fetchWeatherForeacastSuccess(json));
    } catch (ex) {
      dispatch(fetchWeatherForecastFailure(ex));
    }
  }
};
