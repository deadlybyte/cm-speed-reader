import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { fetchWeatherForecast } from '../../actions/weather';
import { FETCH_WEATHER_FORECAST_FAILURE, FETCH_WEATHER_FORECAST_REQUEST, FETCH_WEATHER_FORECAST_SUCCESS } from '../../constants/weather';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
  describe('weather', () => {
    afterEach(() => {
      fetchMock.reset();
      fetchMock.restore();
    });

    it('should create FETCH_WEATHER_FORECAST_SUCCESS action when fetching the weather forecast has been done', async () => {
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

      fetchMock.getOnce(
        `${process.env.REACT_APP_OPEN_WEATHER_MAP_BASE_URL}/data/2.5/weather?units=metric&lat=35&lon=139&APPID=${process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY}`,
        {
          body,
          headers: {
            'content-type': 'application/json'
          }
        }
      );

      const expectedActions = [
        {
          type: FETCH_WEATHER_FORECAST_REQUEST,
          longitude: 139,
          latitude: 35
        },
        {
          type: FETCH_WEATHER_FORECAST_SUCCESS,
          body
        }
      ];

      const store = mockStore({});

      await store.dispatch(fetchWeatherForecast(139, 35));
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should create FETCH_WEATHER_FORECAST_FAILURE action when fetching the weather forecast has failed', async () => {
      fetchMock.getOnce(
        `${process.env.REACT_APP_OPEN_WEATHER_MAP_BASE_URL}/data/2.5/weather?units=metric&lat=35&lon=139&APPID=${process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY}`,
        {
          throws: {
            message: 'Forbidden'
          }
        }
      );

      const expectedActions = [
        {
          type: FETCH_WEATHER_FORECAST_REQUEST,
          longitude: 139,
          latitude: 35
        },
        {
          type: FETCH_WEATHER_FORECAST_FAILURE,
          ex: {
            message: 'Forbidden'
          }
        }
      ];

      const store = mockStore({});

      await store.dispatch(fetchWeatherForecast(139, 35));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
