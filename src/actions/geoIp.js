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
      const response = await fetch('https://freegeoip.net/json/');
      const json = await response.json();
      dispatch(fetchGeoIpSuccess(json));
    } catch (ex) {
      dispatch(fetchGeoIpFailure(ex))
    }
  };
};
