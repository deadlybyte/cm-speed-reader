import weather from '../../reducers/weather';
import { FETCH_WEATHER_FORECAST_REQUEST, FETCH_WEATHER_FORECAST_FAILURE, FETCH_WEATHER_FORECAST_SUCCESS } from '../../constants/weather';

describe('reducers', () => {
  describe('weather', () => {
    it('should return the initial state', () => {
      expect(weather(undefined, {})).toEqual({
        isFetching: false
      });
    });

    describe('FETCH_WEATHER_FORECAST_REQUEST', () => {
      it('should set isFetching to true', () => {
        const initialState = {
          isFetching: false
        };

        const expectedState = {
          isFetching: true
        };

        expect(weather(initialState, {
          type: FETCH_WEATHER_FORECAST_REQUEST
        })).toEqual(expectedState);
      });

      it('should set isFetching to true and remove existing state', () => {
        const initialState = {
          isFetching: false,
          forecast: 'Gusty, Drizzle',
          temperature: 10
        };

        const expectedState = {
          isFetching: true
        };

        expect(weather(initialState, {
          type: FETCH_WEATHER_FORECAST_REQUEST
        })).toEqual(expectedState);
      });
    });

    describe('FETCH_WEATHER_FORECAST_FAILURE', () => {
      it('should set isFetching to false and add the exception', () => {
        const initialState = {
          isFetching: true
        };

        const ex = {
          message: 'Forbidden'
        };

        const expectedState = {
          isFetching: false,
          ex
        };

        expect(weather(initialState, {
          type: FETCH_WEATHER_FORECAST_FAILURE,
          ex
        })).toEqual(expectedState);
      });

      it('should set isFetching to false andd add the exception and remove existing state', () => {
        const initialState = {
          isFetching: true,
          forecast: 'Gusty, Drizzle',
          temperature: 10
        };

        const ex = {
          message: 'Forbidden'
        };

        const expectedState = {
          isFetching: false,
          ex
        };

        expect(weather(initialState, {
          type: FETCH_WEATHER_FORECAST_FAILURE,
          ex
        })).toEqual(expectedState);
      });
    });

    describe('FETCH_WEATHER_FORECAST_SUCCESS', () => {
      it('should set isFetching to false and add response data', () => {
        const initialState = {
          isFetching: true
        };

        const body = {
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
            temp: 289.5,
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
        }

        const expectedState = {
          isFetching: false,
          forecast: body.weather.map(w => w.description).join(', '),
          temperature: Math.round(body.main.temp)
        };

        expect(weather(initialState, {
          type: FETCH_WEATHER_FORECAST_SUCCESS,
          body
        })).toEqual(expectedState);
      });

      it('should set isFetching to false and overwrite existing forecast', () => {
        const initialState = {
          isFetching: true,
          forecast: 'Gusty, Drizzle',
          temperature: 10
        };

        const body = {
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
            temp: 289.5,
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

        const expectedState = {
          isFetching: false,
          forecast: body.weather.map(w => w.description).join(', '),
          temperature: Math.round(body.main.temp)
        }

        expect(weather(initialState, {
          type: FETCH_WEATHER_FORECAST_SUCCESS,
          body
        })).toEqual(expectedState);
      });
    });
  });
});
