import settings from '../../reducers/settings';
import { ADJUST_COMMENTARY_SPEED, MUTE_TOGGLE, PLAY_COMMENTARY_TOGGLE, RESET_COMMENTARY } from '../../constants/settings';

describe('reducers', () => {
  describe('settings', () => {
    it('should return the initial state', () => {
      expect(settings(undefined, {})).toEqual({
        isMuted: true,
        isPlaying: true,
        reset: 0,
        speed: 3,
      });
    });

    describe('MUTE_TOGGLE', () => {
      it('should toggle isMuted to false when true', () => {
        const initialState = {
          isMuted: true,
          isPlaying: true,
          reset: 0,
          speed: 1
        };

        const expectedState = {
          isMuted: false,
          isPlaying: true,
          reset: 0,
          speed: 1
        };

        expect(settings(initialState, { type: MUTE_TOGGLE })).toEqual(expectedState);
      });

      it('should toggle isMuted to true when false', () => {
        const initialState = {
          isMuted: false,
          isPlaying: true,
          reset: 0,
          speed: 1
        };

        const expectedState = {
          isMuted: true,
          isPlaying: true,
          reset: 0,
          speed: 1
        };

        expect(settings(initialState, { type: MUTE_TOGGLE })).toEqual(expectedState);
      });
    });

    describe('ADJUST_COMMENTARY_SPEED', () => {
      it('should adjust the commentary speed', () => {
        const initialState = {
          isMuted: false,
          isPlaying: true,
          reset: 0,
          speed: 1
        };

        const expectedState = {
          isMuted: false,
          isPlaying: true,
          reset: 0,
          speed: 10
        };

        expect(settings(initialState, { type: ADJUST_COMMENTARY_SPEED, speed: 10 })).toEqual(expectedState);
      });
    });

    describe('PLAY_COMMENTARY_TOGGLE', () => {
      it('should toggle isPlaying to false when true', () => {
        const initialState = {
          isMuted: true,
          isPlaying: true,
          reset: 0,
          speed: 1
        };

        const expectedState = {
          isMuted: true,
          isPlaying: false,
          reset: 0,
          speed: 1
        };

        expect(settings(initialState, { type: PLAY_COMMENTARY_TOGGLE })).toEqual(expectedState);
      });

      it('should toggle isPlaying to true when false', () => {
        const initialState = {
          isMuted: true,
          isPlaying: false,
          reset: 0,
          speed: 1
        };

        const expectedState = {
          isMuted: true,
          isPlaying: true,
          reset: 0,
          speed: 1
        };

        expect(settings(initialState, { type: PLAY_COMMENTARY_TOGGLE })).toEqual(expectedState);
      });
    });

    describe('RESET_COMMENTARY', () => {
      it('should reset the commentary and set isPlaying to false', () => {
        const initialState = {
          isMuted: false,
          isPlaying: true,
          reset: 0,
          speed: 3
        };

        const expectedState = {
          isMuted: false,
          isPlaying: false,
          reset: 1,
          speed: 3
        };

        expect(settings(initialState, { type: RESET_COMMENTARY })).toEqual(expectedState);
      });
    });
  });
});
