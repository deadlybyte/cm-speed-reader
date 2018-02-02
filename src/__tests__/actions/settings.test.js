import { adjustCommentarySpeed, muteToggle, playToggle, resetCommentary } from '../../actions/settings';
import { ADJUST_COMMENTARY_SPEED, MUTE_TOGGLE, PLAY_COMMENTARY_TOGGLE, RESET_COMMENTARY } from '../../constants/settings';

describe('actions', () => {
  describe('settings', () => {
    it('should create an action to toggle mute', () => {
      const expectedAction = {
        type: MUTE_TOGGLE
      };

      expect(muteToggle()).toEqual(expectedAction);
    });

    it('should create an action to adjust the commentary speed', () => {
      const expectedAction = {
        type: ADJUST_COMMENTARY_SPEED,
        speed: 1
      };

      expect(adjustCommentarySpeed(1)).toEqual(expectedAction);
    });

    it('should create an action to toggle playing commentary', () => {
      const expectedAction = {
        type: PLAY_COMMENTARY_TOGGLE
      };

      expect(playToggle()).toEqual(expectedAction);
    });

    it('should create an action to reset the commentary', () => {
      const expectedAction = {
        type: RESET_COMMENTARY
      };

      expect(resetCommentary()).toEqual(expectedAction);
    });
  });
});
