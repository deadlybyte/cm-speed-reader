import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class PlayerControls extends Component {
  static commentarySpeeds = ['Very slow', 'Slow', 'Normal', 'Fast', 'Very Fast'];

  static defaultProps = {
    isPlaying: true
  };

  static propTypes = {
    adjustCommentarySpeed: PropTypes.func.isRequired,
    isMuted: PropTypes.bool.isRequired,
    isPlaying: PropTypes.bool,
    muteToggle: PropTypes.func.isRequired,
    playToggle: PropTypes.func.isRequired,
    resetCommentary: PropTypes.func.isRequired,
    speed: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props);
    this.onMuteToggleClick = this.onMuteToggleClick.bind(this);
    this.onPlayToggleClick = this.onPlayToggleClick.bind(this);
    this.onResetClick = this.onResetClick.bind(this);
    this.onSpeedChange = this.onSpeedChange.bind(this);
  }

  render() {
    const { isMuted, speed, isPlaying } = this.props;
    const commentarySpeed = PlayerControls.commentarySpeeds[speed - 1];

    return (
      <div className="container">
        <div className="row justify-content-sm-center no-gutters">
          <div className="col-sm-auto col-xs-12">
            <button id="playToggle" type="button" className="CM-btn btn btn-primary btn-block" onClick={this.onPlayToggleClick}>
              <i className={classNames({ fa: true, 'fa-fw': true, 'fa-w-16': true, 'fa-play-circle': !isPlaying, 'fa-pause-circle': isPlaying })} title={isPlaying ? 'Pause' : 'Play'} />
            </button>
          </div>
          <div className="col-sm-auto col-xs-12">
            <input id="commentary-speed" className="form-control" type="number" min={1} max={5} value={speed} onChange={this.onSpeedChange} title={`Commentary speed - ${commentarySpeed}`} />
          </div>
          <div className="col-sm-auto col-xs-12">
            <button id="muteToggle" type="button" className="CM-btn btn btn-primary btn-block" onClick={this.onMuteToggleClick}>
              <i className={classNames({ fa: true, 'fa-fw': true, 'fa-w-16': true, 'fa-volume-up': isMuted, 'fa-volume-off': !isMuted })} title={ isMuted ? 'Unmute' : 'Mute' } />
            </button>
          </div>
          <div className="col-sm-auto col-xs-12">
            <button id="reset" type="button" className="CM-btn btn btn-primary btn-block" onClick={this.onResetClick}>
              <i className="fa fa-fw fa-w-16 fa-angle-double-left" title="Reset" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  onPlayToggleClick(event) {
    event.preventDefault();

    const { playToggle } = this.props;

    playToggle();
  }

  onMuteToggleClick(event) {
    event.preventDefault();

    const { muteToggle } = this.props;

    muteToggle();
  }

  onResetClick(event) {
    event.preventDefault();

    const { resetCommentary } = this.props;

    resetCommentary();
  }

  onSpeedChange(event) {
    event.preventDefault();

    const { adjustCommentarySpeed } = this.props;
    const newSpeed = parseInt(event.target.value, 10);

    if (!isNaN(newSpeed)) {
      adjustCommentarySpeed(newSpeed);
    }
  }
};

export default PlayerControls;
