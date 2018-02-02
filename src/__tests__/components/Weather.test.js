import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Weather from '../../components/Weather';

describe('Weather', () => {
  describe('render', () => {
    it('should render without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<Weather />, div);
      ReactDOM.unmountComponentAtNode(div);
    });

    it('should render Unknown forecast', () => {
      const componentUnderTest = renderer.create(<Weather />)
        .toJSON();
      expect(componentUnderTest).toMatchSnapshot();
    });

    it('should render the forecast and temperature', () => {
      const componentUnderTest = renderer.create(<Weather forecast="Gusty, Drizzle" temperature={10} />)
        .toJSON();
      expect(componentUnderTest).toMatchSnapshot();
    });

    it('should render the forecast', () => {
      const componentUnderTest = renderer.create(<Weather forecast="Gusty, Drizzle" />)
        .toJSON();
      expect(componentUnderTest).toMatchSnapshot();
    });
  });
});
