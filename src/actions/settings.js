import {
  ADJUST_COMMENTARY_SPEED,
  PLAY_COMMENTARY_TOGGLE,
  MUTE_TOGGLE,
  RESET_COMMENTARY
} from '../constants/settings';

export const adjustCommentarySpeed = speed => {
  return {
    type: ADJUST_COMMENTARY_SPEED,
    speed
  };
};

export const muteToggle = () => {
  return {
    type: MUTE_TOGGLE
  };
};

export const playToggle = () => {
  return {
    type: PLAY_COMMENTARY_TOGGLE
  };
};

export const resetCommentary = () => {
  return {
    type: RESET_COMMENTARY
  };
};
