import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PlayerControls from '../components/PlayerControls';
import { adjustCommentarySpeed, muteToggle } from '../actions/settings';

const mapStateToProps = (state) => {
  const { settings } = state;
  const { isMuted, speed } = settings;

  return {
    isMuted,
    speed
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    adjustCommentarySpeed,
    muteToggle
  }, dispatch);
}

const PlayerControlsContainer = connect(mapStateToProps, mapDispatchToProps)(PlayerControls);

export default PlayerControlsContainer;
