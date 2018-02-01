import { FETCH_SURVEYS } from '../actions/types';

/**
 * Defautl state will have an empty list of surveys
 * @param state
 * @param action
 */
export default function(state = [], action) {
  switch (action.type) {
    case FETCH_SURVEYS:
      return action.payload;
    default:
      return state;
  }
}
