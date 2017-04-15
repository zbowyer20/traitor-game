'use strict';

var Phase = require('./Phase');
var Moves = require('../game/Moves');
var Properties = require('../../constants/PhaseProperties');

class PhaseVote extends Phase {
  constructor() {
    super(Properties.PHASE_VOTE.id, [
      {
        fn: Moves.wait,
        parameters: {},
        emit: {},
        duration: -1
      },
      {
        fn: Moves.updateMissionTracker,
        parameters: {},
        emit: {},
        duration: 100
      },
      {
        fn: Moves.updateComplete,
        parameters: {},
        emit: {},
        duration: 100
      }
    ]);
  }
}

module.exports = PhaseVote;
