import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function gameReducer(state = initialState.game, action) {
  switch(action.type) {
    case types.UPDATE_PHASE: {
      console.log(action);
      return Object.assign({}, state, {
        phase: {
          id: action.data.id
        }
      });
    }
    case types.UPDATE_PLAYERS: {
      return Object.assign({}, state, {
        players: action.data
      });
    }
    case types.UPDATE_SETTINGS: {
      return Object.assign({}, state, {
        settings: action.data
      });
    }
    case types.UPDATE_ME: {
      return Object.assign({}, state, {
        me: action.data
      })
    }
    default: {
      return state;
    }
  }
}
