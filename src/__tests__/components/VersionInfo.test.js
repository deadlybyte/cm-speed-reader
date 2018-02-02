import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import VersionInfo from '../../components/VersionInfo';
import packageJson from '../../../package.json';

describe('VersionInfo', () => {
  describe('render', () => {
    it('should render without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<VersionInfo />, div);
      ReactDOM.unmountComponentAtNode(div);
    });

    it('should render as expected', () => {
      process.env.REACT_APP_VERSION = packageJson.version;
      const componentUnderTest = renderer.create(<VersionInfo />)
        .toJSON();
      expect(componentUnderTest).toMatchSnapshot();
    });
  });
});
