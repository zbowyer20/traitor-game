'use strict';

var Phase = require('./Phase');
var Moves = require('../game/Moves');

class PhaseStart extends Phase {
  constructor() {
    super("PHASE_START", "Players joining...", [
      {
        fn: Moves.wait,
        parameters: {},
        emit: {},
        duration: -1
      }
    ]);
  }
}

module.exports = PhaseStart;
