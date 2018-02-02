import { connect } from 'react-redux';
import CMSpeedReadPlayer from '../components/CMSpeedReadPlayer';

const mapStateToProps = (state) => {
  const { settings } = state;
  const { isPlaying, isMuted, speed } = settings;
  return {
    isPlaying,
    isMuted,
    speed
  };
};

const CMSpeedReadPlayerContainer = connect(mapStateToProps)(CMSpeedReadPlayer);

export default CMSpeedReadPlayerContainer;
