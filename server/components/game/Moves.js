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

function resetPlayers(params) {
  params.players.reset();
}

function nextLeader(params) {
  console.log("Setting our next leader");
  params.players.nextLeader();
}

function choosePlayersForMission(params) {
  params.settings.waiting.players = Properties.players[params.players.ids().length].roundPlayers[params.settings.rounds.current];
}

function updateMissionTracker(params) {
  params.settings.mission = params.players.approvedVote() ? 0 : ++params.settings.mission;
  if (params.settings.mission == 5) {
    endMission(params, false);
    updateRound(params);
    params.settings.mission = 0;
  }
}

function endMission(params, success) {
  params.settings.rounds.score.push(success);
}

function updateScore(params) {
  endMission(params, params.players.getMission().failures == 0);
}

function updateRound(params) {
  params.settings.rounds.current++;
}

function updateComplete(params) {
  params.settings.complete = params.settings.rounds.score.filter(score => { return score == true }).length == 3 ||
    params.settings.rounds.score.filter(score => { return score == false}).length == 3;
}

function reveal(params) {

}

module.exports = {
  wait: wait,
  setTraitors: setTraitors,
  revealAllies: revealAllies,
  setPlayerOrder: setPlayerOrder,
  resetPlayers: resetPlayers,
  nextLeader: nextLeader,
  choosePlayersForMission: choosePlayersForMission,
  updateMissionTracker: updateMissionTracker,
  updateScore: updateScore,
  updateRound: updateRound,
  updateComplete: updateComplete,
  reveal: reveal
};
