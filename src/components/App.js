// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CMSpeedReadPlayerContainer from '../containers/CMSpeedReadPlayerContainer';
import DateDisplay from './DateDisplay';
import CommentaryControlsContainer from '../containers/CommentaryControlsContainer';
import VersionInfo from './VersionInfo';
import VenueContainer from '../containers/VenueContainer';
import WeatherContainer from '../containers/WeatherContainer';
import './App.css';
import '../media/images/stadium-background.jpeg';
import '../media/images/stadium-background-x1.jpeg';

class App extends Component {
  static defaultProps = {
    clientIp: undefined,
    fetchForecast: undefined
  };

  static propTypes = {
    clientIp: PropTypes.string,
    fetchGeoIp: PropTypes.func.isRequired,
    fetchForecast: PropTypes.func
  };

  async componentDidMount() {
    const { fetchGeoIp } = this.props;

    await fetchGeoIp();
  }

  async componentWillReceiveProps(nextProps) {
    const { clientIp } = this.props;

    if (
      nextProps.clientIp &&
      clientIp !== nextProps.clientIp &&
      nextProps.fetchForecast
    ) {
      await nextProps.fetchForecast();
    }
  }

  render() {
    return (
      <div className="container-fluid d-flex flex-column CM-container ">
        <header className="d-flex align-items-center justify-content-center App-header CM-block">
          <h1 className="App-title">Championship Manager Speed Reader</h1>
        </header>
        <div className="row no-gutters CM-overlay">
          <div className="col">
            <CommentaryControlsContainer />
          </div>
        </div>
        <div className="row no-gutters">
          <div className="col">
            <DateDisplay />
          </div>
        </div>
        <div className="row no-gutters align-items-center CM-commentary-container CM-overlay">
          <div className="col">
            <div className="CM-match-block">
              <CMSpeedReadPlayerContainer />
            </div>
          </div>
        </div>
        <div className="row no-gutters justify-items-end CM-overlay">
          <div className="col CM-match-metadata">
            <div className="row no-gutters">
              <div className="col-sm-6">
                <VersionInfo />
              </div>
              <div className="col-sm-6 ml-auto text-sm-right">
                <WeatherContainer />
              </div>
            </div>
          </div>
        </div>
        <div className="row no-gutters justify-items-end">
          <div className="col">
            <VenueContainer />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
