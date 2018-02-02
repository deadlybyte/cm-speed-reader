import { connect } from 'react-redux';
import CMSpeedReadPlayer from '../components/CMSpeedReadPlayer';

const mapStateToProps = (state) => {
  const { settings } = state;
  const { isMuted, speed } = settings;
  return {
    isMuted,
    speed
  };
};

const CMSpeedReadPlayerContainer = connect(mapStateToProps)(CMSpeedReadPlayer);

export default CMSpeedReadPlayerContainer;
