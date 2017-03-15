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
      }
    ]);
  }
}

module.exports = PhaseVote;
