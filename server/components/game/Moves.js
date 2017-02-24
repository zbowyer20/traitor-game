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
  if (params.settings.round == 1 || params.settings.round == 3) {
    params.settings.waiting.players = 2;
  } else {
    params.settings.waiting.players = 3;
  }
}

module.exports = {
  wait: wait,
  setTraitors: setTraitors,
  revealAllies: revealAllies,
  setPlayerOrder: setPlayerOrder,
  choosePlayersForMission: choosePlayersForMission
};
