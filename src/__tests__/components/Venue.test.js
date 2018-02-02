import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Venue from '../../components/Venue';

describe('Venue', () => {
  describe('render', () => {
    it('should render without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<Venue />, div);
      ReactDOM.unmountComponentAtNode(div);
    });

    it('should render as Unknown venue', () => {
      const componentUnderTest = renderer.create(<Venue />)
        .toJSON();
      expect(componentUnderTest).toMatchSnapshot();
    });

    it('should render venue from props', () => {
      const componentUnderTest = renderer.create(<Venue name="Molineux Stadium" location="Wolverhampton" />)
        .toJSON();
      expect(componentUnderTest).toMatchSnapshot();
    });

    it('should render venue name when only name set and default to Unknown location', () => {
      const componentUnderTest = renderer.create(<Venue name="Molineux Stadium" />)
        .toJSON();
      expect(componentUnderTest).toMatchSnapshot();
    });

    it('should render venue location when only location set and default to Unknown name', () => {
      const componentUnderTest = renderer.create(<Venue location="Wolverhampton" />)
        .toJSON();
      expect(componentUnderTest).toMatchSnapshot();
    });
  });
});
