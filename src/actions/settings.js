import { ADJUST_COMMENTARY_SPEED, PLAY_COMMENTARY_TOGGLE, MUTE_TOGGLE } from '../constants/settings';

export const adjustCommentarySpeed = (speed) => {
  return {
    type: ADJUST_COMMENTARY_SPEED,
    speed
  };
};

export const playToggle = () => {
  return {
    type: PLAY_COMMENTARY_TOGGLE
  };
}

export const muteToggle = () => {
  return {
    type: MUTE_TOGGLE
  };
};
