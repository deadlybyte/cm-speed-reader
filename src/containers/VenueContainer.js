import { connect } from 'react-redux';
import Venue from '../components/Venue';

const mapStateToProps = (state) => {
  const { geoIp } = state;
  const { city, country_name } = geoIp;
  return {
    name: city,
    location: country_name
  };
};

const VenueContainer = connect(mapStateToProps)(Venue);

export default VenueContainer;
