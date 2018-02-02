import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import DateDisplay from '../../components/DateDisplay';

describe('DateDisplay', () => {
  const now = Date.now;

  beforeEach(() => {
    Date.now = jest.fn(() => 1487076708000);
  });

  afterEach(() => {
    Date.now = now;
  });

  describe('render', () => {
    it('should render without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<DateDisplay />, div);
      ReactDOM.unmountComponentAtNode(div);
    });

    it('should render as expected', () => {
      const componentUnderTest = renderer.create(<DateDisplay />)
        .toJSON();
      expect(componentUnderTest).toMatchSnapshot();
    });
  });
});
