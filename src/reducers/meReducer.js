import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function meReducer(state = initialState.me, action) {
  switch(action.type) {
    case types.UPDATE_ME: {
      return action.data
    }
    default: {
      return state;
    }
  }
}
