// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SpeedyReader from 'react-speedy-reader';
import fullTimeWhistleAudio from '../media/audio/full-time-whistle.mp3';

class CMSpeedReadPlayer extends Component {
  static defaultProps = {
    isPlaying: true,
    isMuted: true
  };

  static propTypes = {
    isPlaying: PropTypes.bool,
    isMuted: PropTypes.bool,
    reset: PropTypes.number,
    resetCommentary: PropTypes.func.isRequired,
    speed: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    this.playFinalWhistle = this.playFinalWhistle.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { isPlaying, reset } = this.props;

    if (reset !== nextProps.reset) {
      this.speedyReader.reset(false);
    } else if (isPlaying !== nextProps.isPlaying) {
      if (nextProps.isPlaying) {
        this.speedyReader.play();
      } else {
        this.speedyReader.pause();
      }
    }
  }

  async playFinalWhistle() {
    const { isMuted, resetCommentary } = this.props;

    if (!isMuted) {
      const audio = new Audio(fullTimeWhistleAudio);
      await audio.play();
    }

    resetCommentary();
  }

  render() {
    const { playFinalWhistle } = this;
    const { speed } = this.props;

    return (
      <div className="CM-block CM-commentary-block">
        <p className="App-intro">
          <SpeedyReader
            ref={(speedyReader) => this.speedyReader = speedyReader}
            autoPlay
            inputText="To get started, edit src/App.js and save to reload."
            speed={speed * 35}
            onFinish={playFinalWhistle}
          />
        </p>
      </div>
    );
  }
}

export default CMSpeedReadPlayer;
