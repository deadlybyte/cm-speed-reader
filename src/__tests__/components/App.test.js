import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import App from '../../components/App';

describe('App', () => {
  const middlewares = [];
  const mockStore = configureMockStore(middlewares);
  const store = mockStore({
    geoIp: {
    },
    settings: {
      isPlaying: true,
      isMuted: true,
      speed: 1
    },
    weather: {
      forecast: 'Gusty, Drizzle',
      temperature: 10
    }
  });

  describe('render', () => {
    const now = Date.now;

    beforeEach(() => {
      Date.now = jest.fn(() => 1487076708000);
    });

    afterEach(() => {
      Date.now = now;
    });

    it('should render without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(
        <Provider store={store}>
          <App fetchGeoIp={jest.fn} />
        </Provider>
      , div);
      ReactDOM.unmountComponentAtNode(div);
    });

    it('should render as expected', () => {
      const componentUnderTest = renderer.create(
        <Provider store={store}>
          <App fetchGeoIp={jest.fn} />
        </Provider>
      )
        .toJSON();
      expect(componentUnderTest).toMatchSnapshot();
    });
  });

  describe('componentDidMount', () => {
    const fetchGeoIpSpy = jest.fn();

    it('should call fetchGeoIp', () => {
      shallow(
        <App fetchGeoIp={fetchGeoIpSpy} />
      );

      expect(fetchGeoIpSpy).toBeCalled();
    });
  });

  describe('componentWillRecieveProps', () => {
    let fetchForecastSpy;

    beforeEach(() => {
      fetchForecastSpy = jest.fn();
    });

    afterEach(() => {
      fetchForecastSpy.mockClear();
    });

    it('should call fetchForecast when clientIp has been set', () => {
      const componentUnderTest = shallow(
        <App fetchGeoIp={jest.fn} />
      );

      componentUnderTest.setProps({
        clientIp: '0.0.0.0',
        fetchForecast: fetchForecastSpy
      });

      expect(fetchForecastSpy).toHaveBeenCalled();
      componentUnderTest.unmount();
    });

    it('should not call fetchForecast when clientIp has been set to null', () => {
      const componentUnderTest = shallow(
        <App fetchGeoIp={jest.fn} />
      );

      componentUnderTest.setProps({
        clientIp: null,
        fetchForecast: fetchForecastSpy
      });

      expect(fetchForecastSpy).not.toHaveBeenCalled();
      componentUnderTest.unmount();
    });

    it('should not call fetchForecast when clientIp has been set to undefined', () => {
      const componentUnderTest = shallow(
        <App fetchGeoIp={jest.fn} />
      );

      componentUnderTest.setProps({
        clientIp: undefined,
        fetchForecast: fetchForecastSpy
      });

      expect(fetchForecastSpy).not.toHaveBeenCalled();
      componentUnderTest.unmount();
    });
  });
});
