import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CommentaryControls from '../components/CommentaryControls';
import { adjustCommentarySpeed, muteToggle, playToggle, resetCommentary } from '../actions/settings';

const mapStateToProps = (state) => {
  const { settings } = state;
  const { isMuted, isPlaying, reset, speed } = settings;

  return {
    isMuted,
    isPlaying,
    reset,
    speed
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    adjustCommentarySpeed,
    muteToggle,
    playToggle,
    resetCommentary
  }, dispatch);
}

const CommentaryControlsContainer = connect(mapStateToProps, mapDispatchToProps)(CommentaryControls);

export default CommentaryControlsContainer;
