import geoIp from '../../reducers/geoIp';
import { FETCH_GEO_IP_ADDRESS_REQUEST, FETCH_GEO_IP_ADDRESS_FAILURE, FETCH_GEO_IP_ADDRESS_SUCCESS } from '../../constants/geoIp';

describe('reducers', () => {
  describe('geoIp', () => {
    it('should return the initial state', () => {
      expect(geoIp(undefined, {})).toEqual({
        isFetching: false
      });
    });

    describe('FETCH_GEO_IP_ADDRESS_REQUEST', () => {
      it('should set isFetching to true', () => {
        const initialState = {
          isFetching: false
        };

        const expectedState = {
          isFetching: true
        };

        expect(geoIp(initialState, {
          type: FETCH_GEO_IP_ADDRESS_REQUEST
        })).toEqual(expectedState);
      });

      it('should set isFetching to true and remove existing state', () => {
        const initialState = {
          isFetching: false,
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

        const expectedState = {
          isFetching: true
        };

        expect(geoIp(initialState, {
          type: FETCH_GEO_IP_ADDRESS_REQUEST
        })).toEqual(expectedState);
      });
    });

    describe('FETCH_GEO_IP_ADDRESS_FAILURE', () => {
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

        expect(geoIp(initialState, {
          type: FETCH_GEO_IP_ADDRESS_FAILURE,
          ex
        })).toEqual(expectedState);
      });

      it('should set isFetching to false andd add the exception and remove existing state', () => {
        const initialState = {
          isFetching: true,
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

        const ex = {
          message: 'Forbidden'
        };

        const expectedState = {
          isFetching: false,
          ex
        };

        expect(geoIp(initialState, {
          type: FETCH_GEO_IP_ADDRESS_FAILURE,
          ex
        })).toEqual(expectedState);
      });
    });

    describe('FETCH_GEO_IP_ADDRESS_SUCCESS', () => {
      it('should set isFetching to false and add response data', () => {
        const initialState = {
          isFetching: true
        };

        const body = {
          ip: '0.0.0.0',
          country_name: 'United Kingdom',
          city: 'Southampton',
          latitude: 50.9,
          longitude: -1.4
        };

        const expectedState = {
          isFetching: false,
          ...body
        };

        expect(geoIp(initialState, {
          type: FETCH_GEO_IP_ADDRESS_SUCCESS,
          body
        })).toEqual(expectedState);
      });

      it('should set isFetching to false and overwrite existing geoip data', () => {
        const initialState = {
          isFetching: true,
          ip: '0.0.0.0',
          country_name: 'United States',
          city: 'San Francisco',
          latitude: 37.7697,
          longitude: -122.3933
        };

        const body = {
          ip: '0.0.0.0',
          country_name: 'United Kingdom',
          city: 'Southampton',
          latitude: 50.9,
          longitude: -1.4
        };

        const expectedState = {
          isFetching: false,
          ...body
        }

        expect(geoIp(initialState, {
          type: FETCH_GEO_IP_ADDRESS_SUCCESS,
          body
        })).toEqual(expectedState);
      });
    });
  });
});
