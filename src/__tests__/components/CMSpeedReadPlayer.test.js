import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import CMSpeedReadPlayer from '../../components/CMSpeedReadPlayer';

describe('CMSpeedReadPlayer', () => {
  describe('render', () => {
    it('should render without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<CMSpeedReadPlayer speed={1} resetCommentary={jest.fn()} />, div);
      ReactDOM.unmountComponentAtNode(div);
    });

    it('should render as expected', () => {
      const componentUnderTest = renderer.create(<CMSpeedReadPlayer speed={1} resetCommentary={jest.fn()} />)
          .toJSON();
        expect(componentUnderTest).toMatchSnapshot();
    });
  });

  describe('componentWillRecieveProps', () => {
    it('should call play on speedy reader component when isPlaying prop changes to true', () => {
      const componentUnderTest = mount(<CMSpeedReadPlayer isPlaying={false} speed={1} resetCommentary={jest.fn()} />);

      const speedyReaderInstance = componentUnderTest.find('SpeedyReader').instance();
      const playSpy = jest.spyOn(speedyReaderInstance, 'play');
      const pauseSpy = jest.spyOn(speedyReaderInstance, 'pause');
      componentUnderTest.setProps({ isPlaying: true });
      expect(playSpy).toHaveBeenCalled();
      expect(pauseSpy).not.toHaveBeenCalled();
    });

    it('should call pause on speedy reader component when isPlaying props changes to false', () => {
      const componentUnderTest = mount(<CMSpeedReadPlayer isPlaying={true} speed={1} resetCommentary={jest.fn()} />);

      const speedyReaderInstance = componentUnderTest.find('SpeedyReader').instance();
      const playSpy = jest.spyOn(speedyReaderInstance, 'play');
      const pauseSpy = jest.spyOn(speedyReaderInstance, 'pause');
      componentUnderTest.setProps({ isPlaying: false });
      expect(pauseSpy).toHaveBeenCalled();
      expect(playSpy).not.toHaveBeenCalled();
    });

    it('should not call play or pause on speed reader component when isPlaying props do not change', () => {
      const componentUnderTest = mount(<CMSpeedReadPlayer isPlaying={false} speed={1} resetCommentary={jest.fn()} />);

      const speedyReaderInstance = componentUnderTest.find('SpeedyReader').instance();
      const playSpy = jest.spyOn(speedyReaderInstance, 'play');
      const pauseSpy = jest.spyOn(speedyReaderInstance, 'pause');
      componentUnderTest.setProps({ isPlaying: false });
      expect(playSpy).not.toHaveBeenCalled();
      expect(pauseSpy).not.toHaveBeenCalled();
    });

    it('should call reset on speedy reader component when reset props changes', () => {
      const componentUnderTest = mount(<CMSpeedReadPlayer isPlaying={true} speed={1} resetCommentary={jest.fn()} />);

      const speedyReaderInstance = componentUnderTest.find('SpeedyReader').instance();
      const resetSpy = jest.spyOn(speedyReaderInstance, 'reset');
      componentUnderTest.setProps({ reset: 1 });
      expect(resetSpy).toHaveBeenCalled();
    });

    it('should not call reset on speedy reader component when reset props do not change', () => {
      const componentUnderTest = mount(<CMSpeedReadPlayer reset={0} isPlaying={true} speed={1} resetCommentary={jest.fn()} />);

      const speedyReaderInstance = componentUnderTest.find('SpeedyReader').instance();
      const resetSpy = jest.spyOn(speedyReaderInstance, 'reset');
      componentUnderTest.setProps({ reset: 0 });
      expect(resetSpy).not.toHaveBeenCalled();
    });

    it('should only call reset and on speedy reader component when reset props changes and ignore isPlaying change', () => {
      const componentUnderTest = mount(<CMSpeedReadPlayer isPlaying={true} speed={1} resetCommentary={jest.fn()} />);

      const speedyReaderInstance = componentUnderTest.find('SpeedyReader').instance();
      const playSpy = jest.spyOn(speedyReaderInstance, 'play');
      const pauseSpy = jest.spyOn(speedyReaderInstance, 'pause');
      const resetSpy = jest.spyOn(speedyReaderInstance, 'reset');
      componentUnderTest.setProps({ reset: 1, isPlaying: false });
      expect(resetSpy).toHaveBeenCalled();
      expect(playSpy).not.toHaveBeenCalled();
      expect(pauseSpy).not.toHaveBeenCalled();
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
      const componentUnderTest = shallow(<CMSpeedReadPlayer isMuted={false} speed={1} resetCommentary={jest.fn()} />);
      componentUnderTest.instance().playFinalWhistle();

      expect(playMock).toHaveBeenCalled();
    });

    it('should not play audio when passage has been read by default', () => {
      const componentUnderTest = shallow(<CMSpeedReadPlayer speed={1} resetCommentary={jest.fn()} />);
      componentUnderTest.instance().playFinalWhistle();

      expect(playMock).not.toHaveBeenCalled();
    });

    it('should not play audio when passage has been read and audio is muted', () => {
      const componentUnderTest = shallow(<CMSpeedReadPlayer isMuted speed={1} resetCommentary={jest.fn()} />);
      componentUnderTest.instance().playFinalWhistle();

      expect(playMock).not.toHaveBeenCalled();
    });

    describe('resetCommentary', () => {
      let resetCommentarySpy;

      beforeEach(() => {
        resetCommentarySpy = jest.fn();
      });

      afterEach(() => {
        resetCommentarySpy.mockClear();
      });

      it('should call resetCommentary when passage has been read and audio not muted', () => {
        const componentUnderTest = shallow(<CMSpeedReadPlayer speed={1} resetCommentary={resetCommentarySpy} />);
        componentUnderTest.instance().playFinalWhistle();

        expect(resetCommentarySpy).toHaveBeenCalled();
      });

      it('should call resetCommentary when passage has been read and audio is muted', () => {
        const componentUnderTest = shallow(<CMSpeedReadPlayer isMuted speed={1} resetCommentary={resetCommentarySpy} />);
        componentUnderTest.instance().playFinalWhistle();

        expect(resetCommentarySpy).toHaveBeenCalled();
      });
    });
  });
});
