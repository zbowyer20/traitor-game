import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function settingsReducer(state = initialState.settings, action) {
  switch(action.type) {
    case types.UPDATE_SETTINGS: {
      return Object.assign({}, state, {
        ready: action.data.ready,
        round: action.data.round,
        waiting: action.data.waiting
      });
    }
    case types.TOGGLE_MISSION_PLAYER: {
      let selected = state.selectedPlayers.indexOf(action.id) > -1;
      return Object.assign({}, state, {
        selectedPlayers: selected ? state.selectedPlayers.filter(id => {
            return id != action.id
          }) : [...state.selectedPlayers, action.id]
      })
    }
    default: {
      return state;
    }
  }
}
