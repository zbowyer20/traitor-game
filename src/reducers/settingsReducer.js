import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function settingsReducer(state = initialState.settings, action) {
  switch(action.type) {
    case types.UPDATE_SETTINGS: {
      return Object.assign({}, state, action.data);
    }
    case types.TOGGLE_MISSION_PLAYER: {
      let selected = state.selectedPlayers.indexOf(action.id) > -1;
      console.log(state.selectedPlayers);
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
