var Properties = require('../../constants/GameProperties');

function wait(params) {
}

function setTraitors(params) {
  params.players.setTraitors();
}

function setPlayerOrder(params) {
  params.players.setOrder();
}

function revealAllies() {

}

function choosePlayersForMission(params) {
  params.settings.waiting.players = Properties.players[params.players.ids().length].roundPlayers[params.settings.round];
}

module.exports = {
  wait: wait,
  setTraitors: setTraitors,
  revealAllies: revealAllies,
  setPlayerOrder: setPlayerOrder,
  choosePlayersForMission: choosePlayersForMission
};
