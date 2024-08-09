import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CMSpeedReadPlayer from '../components/CMSpeedReadPlayer';
import { resetCommentary } from '../actions/settings';

const mapStateToProps = state => {
  const { settings } = state;
  const { isPlaying, isMuted, reset, speed } = settings;
  return {
    isPlaying,
    isMuted,
    reset,
    speed
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      resetCommentary
    },
    dispatch
  );
};

const CMSpeedReadPlayerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CMSpeedReadPlayer);

export default CMSpeedReadPlayerContainer;
