import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { fetchGeoIp } from '../../actions/geoIp';
import { FETCH_GEO_IP_ADDRESS_FAILURE, FETCH_GEO_IP_ADDRESS_REQUEST, FETCH_GEO_IP_ADDRESS_SUCCESS } from '../../constants/geoIp';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
  describe('geoIp', () => {
    afterEach(() => {
      fetchMock.reset();
      fetchMock.restore();
    });

    it('should create FETCH_GEO_IP_ADDRESS_SUCCESS action when fetching geoip has been done', async () => {
      const body = {
        ip: '0.0.0.0',
        country_code: 'GB',
        country_name: 'United Kingdom',
        region_code: 'ENG',
        region_name: 'England',
        city: 'Southampton',
        zip_code: 'SO14',
        time_zone: 'Europe/London',
        latitude: 50.9,
        longitude: -1.4,
        metro_code: 0
      };

      fetchMock.getOnce(
        'https://freegeoip.net/json/',
        {
          body,
          headers: {
            'content-type': 'application/json'
          }
        }
      );

      const expectedActions = [
        {
          type: FETCH_GEO_IP_ADDRESS_REQUEST
        },
        {
          type: FETCH_GEO_IP_ADDRESS_SUCCESS,
          body
        }
      ];

      const store = mockStore({});

      await store.dispatch(fetchGeoIp());
      expect(store.getActions()).toEqual(expectedActions);
      expect(fetchMock.called()).toBeTruthy();
    });

    it('should create FETCH_GEO_IP_ADDRESS_FAILURE action when fetching geoip has failed', async () => {
      fetchMock.getOnce(
        'https://freegeoip.net/json/',
        {
          throws: {
            message: 'Forbidden'
          }
        }
      );

      const expectedActions = [
        {
          type: FETCH_GEO_IP_ADDRESS_REQUEST
        },
        {
          type: FETCH_GEO_IP_ADDRESS_FAILURE,
          ex: {
            message: 'Forbidden'
          }
        }
      ];

      const store = mockStore({});

      await store.dispatch(fetchGeoIp());
      expect(store.getActions()).toEqual(expectedActions);
      expect(fetchMock.called()).toBeTruthy();
    });

    it('should create FETCH_GEO_IP_ADDRESS_SUCCESS action and not fetch the geoip from the api and mocks the data when in development mode', async () => {
      const NODE_ENV = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';

      const body = {
        ip: '0.0.0.0',
        country_code: 'GB',
        country_name: 'United Kingdom',
        region_code: 'ENG',
        region_name: 'England',
        city: 'Southampton',
        zip_code: 'SO14',
        time_zone: 'Europe/London',
        latitude: 50.9,
        longitude: -1.4,
        metro_code: 0
      };

      const expectedActions = [
        {
          type: FETCH_GEO_IP_ADDRESS_REQUEST
        },
        {
          type: FETCH_GEO_IP_ADDRESS_SUCCESS,
          body
        }
      ];

      const store = mockStore({});

      await store.dispatch(fetchGeoIp());
      expect(store.getActions()).toEqual(expectedActions);
      expect(fetchMock.called()).toBeFalsy();

      process.env.NODE_ENV = NODE_ENV;
    });
  });
});
