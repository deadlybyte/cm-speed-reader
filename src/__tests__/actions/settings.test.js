import { adjustCommentarySpeed, muteToggle, playToggle } from '../../actions/settings';
import { ADJUST_COMMENTARY_SPEED, PLAY_COMMENTARY_TOGGLE, MUTE_TOGGLE } from '../../constants/settings';

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
  });
});
