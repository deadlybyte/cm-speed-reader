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
      let json;
      if (process.env.NODE_ENV !== 'development') {
        const response = await fetch(`${process.env.REACT_APP_OPEN_WEATHER_MAP_BASE_URL}/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&APPID=${process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY}`);
        json = await response.json();
      } else {
        json = {
          coord: {
            lon: 139, lat: 35
          },
          sys: {
            country: 'JP',
            sunrise: 1369769524,
            sunset: 1369821049
          },
          weather: [{
            id: 804,
            main: 'clouds',
            description: 'overcast clouds',
            icon: '04n'
          }],
          main: {
            temp: 21.5,
            humidity: 89,
            pressure: 1013,
            temp_min: 287.04,
            temp_max: 292.04
          },
          wind: {
            speed: 7.31,
            deg: 187.002
          },
          rain: {
            '3h': 0
          },
          clouds: {
            all: 92
          },
          dt: 1369824698,
          id: 1851632,
          name: 'Shuzenji',
          cod: 200
        };
      }
      dispatch(fetchWeatherForeacastSuccess(json));
    } catch (ex) {
      dispatch(fetchWeatherForecastFailure(ex));
    }
  }
};
