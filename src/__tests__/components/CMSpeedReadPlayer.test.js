import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import CMSpeedReadPlayer from '../../components/CMSpeedReadPlayer';

describe('CMSpeedReadPlayer', () => {
  describe('render', () => {
    it('should render without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<CMSpeedReadPlayer speed={1} />, div);
      ReactDOM.unmountComponentAtNode(div);
    });

    it('should render as expected', () => {
      const componentUnderTest = renderer.create(<CMSpeedReadPlayer speed={1} />)
          .toJSON();
        expect(componentUnderTest).toMatchSnapshot();
    });
  });

  describe('playFinalWhistle', () => {
    let playMock;

    beforeEach(() => {
      playMock = jest.spyOn(Audio.prototype, 'play');
    });

    afterEach(() => {
      playMock.mockClear();
    });

    it('should play audio when passage has been read and audio not muted', () => {
      const componentUnderTest = shallow(<CMSpeedReadPlayer isMuted={false} speed={1} />);
      componentUnderTest.instance().playFinalWhistle();

      expect(playMock).toHaveBeenCalled();
    });

    it('should not play audio when passage has been read by default', () => {
      const componentUnderTest = shallow(<CMSpeedReadPlayer speed={1} />);
      componentUnderTest.instance().playFinalWhistle();

      expect(playMock).not.toHaveBeenCalled();
    });

    it('should not play audio when passage has been read and audio is muted', () => {
      const componentUnderTest = shallow(<CMSpeedReadPlayer isMuted speed={1} />);
      componentUnderTest.instance().playFinalWhistle();

      expect(playMock).not.toHaveBeenCalled();
    });
  });
});
