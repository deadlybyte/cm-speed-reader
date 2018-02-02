// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SpeedyReader from 'react-speedy-reader';
import fullTimeWhistleAudio from '../media/audio/full-time-whistle.mp3';

class CMSpeedReadPlayer extends Component {
  static defaultProps = {
    isMuted: true
  };

  static propTypes = {
    isMuted: PropTypes.bool,
    speed: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    this.playFinalWhistle = this.playFinalWhistle.bind(this);
  }

  async playFinalWhistle() {
    const { isMuted } = this.props;

    if (!isMuted) {
      const audio = new Audio(fullTimeWhistleAudio);
      await audio.play();
    }
  }

  render() {
    const { playFinalWhistle } = this;
    const { speed } = this.props;

    return (
      <div className="CM-block CM-commentary-block">
        <p className="App-intro">
          <SpeedyReader
            autoPlay
            inputText="To get started, edit src/App.js and save to reload."
            speed={speed * 100}
            onFinish={playFinalWhistle}
          />
        </p>
      </div>
    );
  }
}

export default CMSpeedReadPlayer;
