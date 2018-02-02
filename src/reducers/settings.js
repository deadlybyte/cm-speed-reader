import { ADJUST_COMMENTARY_SPEED, PLAY_COMMENTARY_TOGGLE, MUTE_TOGGLE } from '../constants/settings';

const initialState = {
  isMuted: true,
  isPlaying: true,
  speed: 1
};

const settings = (state = initialState, action) => {
  switch (action.type) {
    case MUTE_TOGGLE:
      return {
        ...state,
        isMuted: !state.isMuted
      };
    case ADJUST_COMMENTARY_SPEED: {
      const { speed } = action;
      return {
        ...state,
        speed
      };
    }
    case PLAY_COMMENTARY_TOGGLE:
      return {
        ...state,
        isPlaying: !state.isPlaying
      };
    default:
      return state;
  }
};

export default settings;
