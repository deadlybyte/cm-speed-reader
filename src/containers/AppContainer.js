// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import App from '../components/App';
import { fetchGeoIp } from '../actions/geoIp';
import { fetchWeatherForecast } from '../actions/weather';

const mapStateToProps = (state) => {
  const { geoIp } = state;
  const { ip, latitude, longitude } = geoIp;

  return {
    clientIp: ip,
    latitude,
    longitude
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchGeoIp,
    fetchWeatherForecast
  }, dispatch);
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { clientIp } = stateProps;
  const { fetchGeoIp } = dispatchProps;
  let fetchForecast;

  if (clientIp) {
    const { latitude, longitude } = stateProps;
    fetchForecast = () => dispatchProps.fetchWeatherForecast(longitude, latitude)
  }

  return {
    clientIp,
    fetchGeoIp,
    fetchForecast
  };
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(App);

export default AppContainer;
