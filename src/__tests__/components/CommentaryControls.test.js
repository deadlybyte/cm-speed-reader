import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import CommentaryControls from '../../components/CommentaryControls';

describe('PlayerControls', () => {
  describe('render', () => {
    it('should render without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(
        <CommentaryControls
          adjustCommentarySpeed={jest.fn}
          speed={1}
          isMuted
          muteToggle={jest.fn}
          playToggle={jest.fn}
          resetCommentary={jest.fn()}
        />
      , div);
      ReactDOM.unmountComponentAtNode(div);
    });

    it('should render as expected', () => {
      const componentUnderTest = renderer.create(
        <CommentaryControls
          adjustCommentarySpeed={jest.fn()}
          speed={1}
          isMuted
          muteToggle={jest.fn}
          playToggle={jest.fn}
          resetCommentary={jest.fn()}
        />
      ).toJSON();
      expect(componentUnderTest).toMatchSnapshot();
    });

    it('should render unmute button when muted', () => {
      const componentUnderTest = renderer.create(
        <CommentaryControls
          adjustCommentarySpeed={jest.fn()}
          speed={1}
          isMuted
          muteToggle={jest.fn}
          playToggle={jest.fn}
          resetCommentary={jest.fn()}
        />
      ).toJSON();
      expect(componentUnderTest).toMatchSnapshot();
    });

    it('should render mute button when not muted', () => {
      const componentUnderTest = renderer.create(
        <CommentaryControls
          adjustCommentarySpeed={jest.fn()}
          speed={1}
          isMuted={false}
          muteToggle={jest.fn}
          playToggle={jest.fn}
          resetCommentary={jest.fn()}
        />
      ).toJSON();
      expect(componentUnderTest).toMatchSnapshot();
    });

    it('should render pause button when playing', () => {
      const componentUnderTest = renderer.create(
        <CommentaryControls
          adjustCommentarySpeed={jest.fn()}
          speed={1}
          isMuted
          isPlaying
          muteToggle={jest.fn}
          playToggle={jest.fn}
          resetCommentary={jest.fn()}
        />
      ).toJSON();
      expect(componentUnderTest).toMatchSnapshot();
    });

    it('should render play button when paused', () => {
      const componentUnderTest = renderer.create(
        <CommentaryControls
          adjustCommentarySpeed={jest.fn()}
          speed={1}
          isMuted
          isPlaying={false}
          muteToggle={jest.fn}
          playToggle={jest.fn}
          resetCommentary={jest.fn()}
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
          <CommentaryControls
            speed={1}
            adjustCommentarySpeed={jest.fn()}
            isMuted
            muteToggle={muteToggleSpy}
            playToggle={jest.fn()}
            resetCommentary={jest.fn()}
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
          <CommentaryControls
            speed={1}
            adjustCommentarySpeed={jest.fn()}
            isMuted
            muteToggle={jest.fn()}
            playToggle={playToggleSpy}
            resetCommentary={jest.fn()}
          />
        );

        const playToggleButton = componentUnderTest.find('button#playToggle');
        playToggleButton.simulate('click', { preventDefault: jest.fn() });

        expect(playToggleSpy).toHaveBeenCalled();
      });
    });

    describe('onResetClick', () => {
      let resetCommentarySpy;

      beforeEach(() => {
        resetCommentarySpy = jest.fn();
      });

      it('should call resetCommentary when reset button is clicked', () => {
        const componentUnderTest = shallow(
          <CommentaryControls
            speed={1}
            adjustCommentarySpeed={jest.fn()}
            isMuted
            muteToggle={jest.fn()}
            playToggle={jest.fn()}
            resetCommentary={resetCommentarySpy}
          />
        );

        const resetButton = componentUnderTest.find('button#reset');
        resetButton.simulate('click', { preventDefault: jest.fn() });

        expect(resetCommentarySpy).toHaveBeenCalled();
      });
    });

    describe('onSpeedChange', () => {
      let adjustCommentarySpeedSpy;

      beforeEach(() => {
        adjustCommentarySpeedSpy = jest.fn();
      });

      it('should call adjustCommentarySpeed when input has changed', () => {
        const componentUnderTest = shallow(
          <CommentaryControls
            speed={1}
            adjustCommentarySpeed={adjustCommentarySpeedSpy}
            isMuted
            muteToggle={jest.fn()}
            playToggle={jest.fn()}
            resetCommentary={jest.fn()}
          />
        );

        const speedInput = componentUnderTest.find('select#commentary-speed');
        speedInput.simulate('change', { preventDefault: jest.fn(), currentTarget: { value: '1' } });

        expect(adjustCommentarySpeedSpy).toHaveBeenCalled();
      });

      it('should not call adjustCommentarySpeed when input is invalid', () => {
        const componentUnderTest = shallow(
          <CommentaryControls
            speed={1}
            adjustCommentarySpeed={adjustCommentarySpeedSpy}
            isMuted
            muteToggle={jest.fn()}
            playToggle={jest.fn()}
            resetCommentary={jest.fn()}
          />
        );

        const speedInput = componentUnderTest.find('select#commentary-speed');
        speedInput.simulate('change', { preventDefault: jest.fn(), currentTarget: { value: 'test' } });

        expect(adjustCommentarySpeedSpy).not.toHaveBeenCalled();
      });
    });
  });
});
