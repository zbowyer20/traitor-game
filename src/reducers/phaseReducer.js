import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function phaseReducer(state = initialState.phase, action) {
  switch(action.type) {
    case types.UPDATE_PHASE: {
      console.log("I've received something for phases:");
      console.log(action.data);
      return Object.assign({}, state, {
        id: action.data.id
      });
    }
    default: {
      return state;
    }
  }
}
