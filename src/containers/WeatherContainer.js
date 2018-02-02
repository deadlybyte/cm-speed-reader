import { connect } from 'react-redux';
import Weather from '../components/Weather';

const mapStateToProps = (state) => {
  const { weather } = state;
  const { forecast, temperature } = weather;
  return {
    forecast,
    temperature
  };
};

const WeatherContainer = connect(mapStateToProps)(Weather);

export default WeatherContainer;
