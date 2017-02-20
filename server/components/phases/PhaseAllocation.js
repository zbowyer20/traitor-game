'use strict';

var Phase = require('./Phase');
var Moves = require('../game/Moves');

class PhaseAllocation extends Phase {
  constructor() {
    super("PHASE_ALLOCATION", "Allocating roles", [
      {
        fn: Moves.setTraitors,
        parameters: {},
        emit: {},
        duration: 5000
      }
    ]);
  }
}

module.exports = PhaseAllocation;
