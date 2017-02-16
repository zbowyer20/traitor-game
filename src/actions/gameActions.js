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

export function startGame() {
  return dispatch => {
    let url = 'http://localhost:3535/api/game/start';
    fetch(url).then(response => {
      console.log(response);
    }).catch(error => {
      throw(error);
    });
  };
}

export function ready() {
  return {type: types.READY};
}

export function endGame() {
  return {type: types.END_GAME};
}
