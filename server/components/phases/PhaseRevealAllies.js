'use strict';

var Phase = require('./Phase');
var Moves = require('../game/Moves');
var Properties = require('../../constants/PhaseProperties');

class PhaseRevealAllies extends Phase {
  constructor() {
    super(Properties.PHASE_REVEAL_ALLIES.id, [
      {
        fn: Moves.revealAllies,
        parameters: {},
        emit: {},
        duration: 1000
      }
    ]);
  }
}

module.exports = PhaseRevealAllies;
