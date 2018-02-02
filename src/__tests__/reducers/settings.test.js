import settings from '../../reducers/settings';
import { ADJUST_COMMENTARY_SPEED, MUTE_TOGGLE, PLAY_COMMENTARY_TOGGLE } from '../../constants/settings';

describe('reducers', () => {
  describe('settings', () => {
    it('should return the initial state', () => {
      expect(settings(undefined, {})).toEqual({
        isMuted: true,
        isPlaying: true,
        speed: 1,
      });
    });

    describe('MUTE_TOGGLE', () => {
      it('should toggle isMuted to false when true', () => {
        const initialState = {
          isMuted: true,
          isPlaying: true,
          speed: 1
        };

        const expectedState = {
          isMuted: false,
          isPlaying: true,
          speed: 1
        };

        expect(settings(initialState, { type: MUTE_TOGGLE })).toEqual(expectedState);
      });

      it('should toggle isMuted to true when false', () => {
        const initialState = {
          isMuted: false,
          isPlaying: true,
          speed: 1
        };

        const expectedState = {
          isMuted: true,
          isPlaying: true,
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
          speed: 1
        };

        const expectedState = {
          isMuted: false,
          isPlaying: true,
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
          speed: 1
        };

        const expectedState = {
          isMuted: true,
          isPlaying: false,
          speed: 1
        };

        expect(settings(initialState, { type: PLAY_COMMENTARY_TOGGLE })).toEqual(expectedState);
      });

      it('should toggle isPlaying to true when false', () => {
        const initialState = {
          isMuted: true,
          isPlaying: false,
          speed: 1
        };

        const expectedState = {
          isMuted: true,
          isPlaying: true,
          speed: 1
        };

        expect(settings(initialState, { type: PLAY_COMMENTARY_TOGGLE })).toEqual(expectedState);
      });
    });
  });
});
