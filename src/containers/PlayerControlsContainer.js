import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PlayerControls from '../components/PlayerControls';
import { adjustCommentarySpeed, muteToggle, playToggle } from '../actions/settings';

const mapStateToProps = (state) => {
  const { settings } = state;
  const { isMuted, isPlaying, speed } = settings;

  return {
    isMuted,
    isPlaying,
    speed
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    adjustCommentarySpeed,
    muteToggle,
    playToggle
  }, dispatch);
}

const PlayerControlsContainer = connect(mapStateToProps, mapDispatchToProps)(PlayerControls);

export default PlayerControlsContainer;
