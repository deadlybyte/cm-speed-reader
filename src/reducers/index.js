import { combineReducers } from 'redux';
import geoIp from './geoIp';
import settings from './settings';
import weather from './weather';

const reducers = combineReducers({
  geoIp,
  settings,
  weather
});

export default reducers;
