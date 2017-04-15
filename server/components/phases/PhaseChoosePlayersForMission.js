'use strict';

var Phase = require('./Phase');
var Moves = require('../game/Moves');
var Properties = require('../../constants/PhaseProperties');

class PhaseChoosePlayersForMission extends Phase {
  constructor() {
    super(Properties.PHASE_CHOOSE_PLAYERS_FOR_MISSION.id, [
      {
        fn: Moves.resetPlayers,
        parameters: {},
        emit: {},
        duration: 100
      },
      {
        fn: Moves.nextLeader,
        parameters: {},
        emit: {},
        duration: 100
      },
      {
        fn: Moves.choosePlayersForMission,
        parameters: {},
        emit: {},
        duration: -1
      }
    ]);
  }
}

module.exports = PhaseChoosePlayersForMission;
