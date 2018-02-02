import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import PlayerControls from '../../components/PlayerControls';

describe('PlayerControls', () => {
  describe('render', () => {
    it('should render without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(
        <PlayerControls
          adjustCommentarySpeed={jest.fn}
          speed={1}
          isMuted
          muteToggle={jest.fn}
          playToggle={jest.fn}
        />
      , div);
      ReactDOM.unmountComponentAtNode(div);
    });

    it('should render as expected', () => {
      const componentUnderTest = renderer.create(
        <PlayerControls
          adjustCommentarySpeed={jest.fn()}
          speed={1}
          isMuted
          muteToggle={jest.fn}
          playToggle={jest.fn}
        />
      ).toJSON();
      expect(componentUnderTest).toMatchSnapshot();
    });

    it('should render unmute button when muted', () => {
      const componentUnderTest = renderer.create(
        <PlayerControls
          adjustCommentarySpeed={jest.fn()}
          speed={1}
          isMuted
          muteToggle={jest.fn}
          playToggle={jest.fn}
        />
      ).toJSON();
      expect(componentUnderTest).toMatchSnapshot();
    });

    it('should render mute button when not muted', () => {
      const componentUnderTest = renderer.create(
        <PlayerControls
          adjustCommentarySpeed={jest.fn()}
          speed={1}
          isMuted={false}
          muteToggle={jest.fn}
          playToggle={jest.fn}
        />
      ).toJSON();
      expect(componentUnderTest).toMatchSnapshot();
    });

    it('should render pause button when playing', () => {
      const componentUnderTest = renderer.create(
        <PlayerControls
          adjustCommentarySpeed={jest.fn()}
          speed={1}
          isMuted
          isPlaying
          muteToggle={jest.fn}
          playToggle={jest.fn}
        />
      ).toJSON();
      expect(componentUnderTest).toMatchSnapshot();
    });

    it('should render play button when paused', () => {
      const componentUnderTest = renderer.create(
        <PlayerControls
          adjustCommentarySpeed={jest.fn()}
          speed={1}
          isMuted
          isPlaying={false}
          muteToggle={jest.fn}
          playToggle={jest.fn}
        />
      ).toJSON();
      expect(componentUnderTest).toMatchSnapshot();
    });
  });

  describe('interaction', () => {
    describe('onMuteToggleClick', () => {
      let muteToggleSpy;

      beforeEach(() => {
        muteToggleSpy = jest.fn();
      });

      it('should call muteToggle when mute button is clicked', () => {
        const componentUnderTest = shallow(
          <PlayerControls
            speed={1}
            adjustCommentarySpeed={jest.fn()}
            isMuted
            muteToggle={muteToggleSpy}
            playToggle={jest.fn()}
          />
        );

        const muteToggleButton = componentUnderTest.find('button#muteToggle');
        muteToggleButton.simulate('click', { preventDefault: jest.fn() });

        expect(muteToggleSpy).toHaveBeenCalled();
      });
    });

    describe('onPlayToggleClick', () => {
      let playToggleSpy;

      beforeEach(() => {
        playToggleSpy = jest.fn();
      });

      it('should call playToggle when mute button is clicked', () => {
        const componentUnderTest = shallow(
          <PlayerControls
            speed={1}
            adjustCommentarySpeed={jest.fn()}
            isMuted
            muteToggle={jest.fn()}
            playToggle={playToggleSpy}
          />
        );

        const playToggleButton = componentUnderTest.find('button#playToggle');
        playToggleButton.simulate('click', { preventDefault: jest.fn() });

        expect(playToggleSpy).toHaveBeenCalled();
      });
    });

    describe('onSpeedChange', () => {
      let adjustCommentarySpeedSpy;

      beforeEach(() => {
        adjustCommentarySpeedSpy = jest.fn();
      });

      it('should call adjustCommentarySpeed when input has changed', () => {
        const componentUnderTest = shallow(
          <PlayerControls
            speed={1}
            adjustCommentarySpeed={adjustCommentarySpeedSpy}
            isMuted
            muteToggle={jest.fn()}
            playToggle={jest.fn()}
          />
        );

        const speedInput = componentUnderTest.find('input');
        speedInput.simulate('change', { preventDefault: jest.fn(), target: { value: '1' } });

        expect(adjustCommentarySpeedSpy).toHaveBeenCalled();
      });

      it('should not call adjustCommentarySpeed when input is invalid', () => {
        const componentUnderTest = shallow(
          <PlayerControls
            speed={1}
            adjustCommentarySpeed={adjustCommentarySpeedSpy}
            isMuted
            muteToggle={jest.fn()}
            playToggle={jest.fn()}
          />
        );

        const speedInput = componentUnderTest.find('input#commentary-speed');
        speedInput.simulate('change', { preventDefault: jest.fn(), target: { value: 'test' } });

        expect(adjustCommentarySpeedSpy).not.toHaveBeenCalled();
      });
    });
  });
});
