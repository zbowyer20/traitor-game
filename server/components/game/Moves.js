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

module.exports = {
  wait: wait,
  setTraitors: setTraitors,
  revealAllies: revealAllies,
  setPlayerOrder: setPlayerOrder
};
