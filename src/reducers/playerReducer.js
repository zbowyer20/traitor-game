import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function playerReducer(state = initialState.players, action) {
  switch(action.type) {
    case types.UPDATE_PLAYERS: {
      return action.data;
    }
    default: {
      return state;
    }
  }
}
