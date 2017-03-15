import * as types from './actionTypes';

export function loadGameSuccess(game) {
  return {type: types.LOAD_GAME_SUCCESS, game};
}

export function updatePlayers(data) {
  return {type: types.UPDATE_PLAYERS, data};
}

export function updatePhase(data) {
  return {type: types.UPDATE_PHASE, data};
}

export function updateSettings(data) {
  return {type: types.UPDATE_SETTINGS, data};
}

export function updateMe(data) {
  return {type: types.UPDATE_ME, data};
}

export function choosePlayerForMission(id) {
  return dispatch => {
    dispatch({type: types.TOGGLE_MISSION_PLAYER, id});
  }
}

export function ready() {
  return {type: types.READY};
}

export function endGame() {
  return {type: types.END_GAME};
}
