import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function meReducer(state = initialState.me, action) {
  switch(action.type) {
    case types.UPDATE_ME: {
      console.log("I've received something for me:");
      return Object.assign({}, state, action.data);
    }
    default: {
      return state;
    }
  }
}
