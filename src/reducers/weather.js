import { FETCH_WEATHER_FORECAST_FAILURE, FETCH_WEATHER_FORECAST_REQUEST, FETCH_WEATHER_FORECAST_SUCCESS } from '../constants/weather';

const initialState = {
  isFetching: false
};

const geoIp = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WEATHER_FORECAST_FAILURE: {
      const { ex } = action;

      return {
        ex,
        isFetching: false
      };
    }
    case FETCH_WEATHER_FORECAST_REQUEST: {
      return {
        isFetching: true
      };
    }
    case FETCH_WEATHER_FORECAST_SUCCESS: {
      const {
        weather,
        main
      } = action.body;

      const forecast = weather.map(w => w.description).join(', ');

      return {
        isFetching: false,
        forecast,
        temperature: Math.round(main.temp)
      };
    }
    default:
      return state;
  }
};

export default geoIp;
