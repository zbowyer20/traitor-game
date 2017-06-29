import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function playerReducer(state = initialState.players, action) {
  switch(action.type) {
    case types.UPDATE_PLAYERS: {
      console.log("I've received something for players:");
      console.log(action.data);
      console.log(state);
      let players = [];
      for (var i = 0; i < action.data.length; i++) {
        let j = 0;
        let found = false;
        while (!found && j < state.length) {
          if (state[j].id == action.data[i].id) {
            players.push(Object.assign({}, state[j], action.data[i]));
            found = true;
          } else {
            j++;
          }
        }
        if (!found) {
          players.push(action.data[i]);
        }
      }
      return players;
    }
    default: {
      return state;
    }
  }
}
