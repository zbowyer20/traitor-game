'use strict';

var Phase = require('./Phase');
var Moves = require('../game/Moves');

class PhaseRevealAllies extends Phase {
  constructor() {
    super("PHASE_REVEAL_ALLIES", "Traitors revealing themselves...", [
      {
        fn: Moves.revealAllies,
        parameters: {},
        emit: {
          allies: true
        },
        duration: -1
      }
    ]);
  }
}

module.exports = PhaseRevealAllies;
