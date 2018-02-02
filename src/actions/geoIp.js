import 'cross-fetch/polyfill';

import { FETCH_GEO_IP_ADDRESS_FAILURE, FETCH_GEO_IP_ADDRESS_REQUEST, FETCH_GEO_IP_ADDRESS_SUCCESS } from '../constants/geoIp';

const fetchGeoIpRequest = () => {
  return {
    type: FETCH_GEO_IP_ADDRESS_REQUEST
  };
};

const fetchGeoIpSuccess = (body) => {
  return {
    type: FETCH_GEO_IP_ADDRESS_SUCCESS,
    body
  };
};

const fetchGeoIpFailure = (ex) => {
  return {
    type: FETCH_GEO_IP_ADDRESS_FAILURE,
    ex
  };
};

export const fetchGeoIp = () => {
  return async dispatch => {
    dispatch(fetchGeoIpRequest());
    try {
      let json;
      if (process.env.NODE_ENV !== 'development') {
        const response = await fetch('https://freegeoip.net/json/');
        json = await response.json();
      } else {
        json = {
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
      }
      dispatch(fetchGeoIpSuccess(json));
    } catch (ex) {
      dispatch(fetchGeoIpFailure(ex))
    }
  };
};
