import {
  FETCH_GEO_IP_ADDRESS_FAILURE,
  FETCH_GEO_IP_ADDRESS_REQUEST,
  FETCH_GEO_IP_ADDRESS_SUCCESS
} from '../constants/geoIp';

const initialState = {
  isFetching: false
};

const geoIp = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GEO_IP_ADDRESS_FAILURE: {
      const { ex } = action;

      return {
        ex,
        isFetching: false
      };
    }
    case FETCH_GEO_IP_ADDRESS_REQUEST: {
      return {
        isFetching: true
      };
    }
    case FETCH_GEO_IP_ADDRESS_SUCCESS: {
      const { city, country_name, ip, latitude, longitude } = action.body;

      return {
        city,
        country_name,
        ip,
        latitude,
        longitude,
        isFetching: false
      };
    }
    default:
      return state;
  }
};

export default geoIp;
