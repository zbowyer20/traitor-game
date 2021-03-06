'use strict';

var Phase = require('./Phase');
var Moves = require('../game/Moves');
var Properties = require('../../constants/PhaseProperties');

class PhaseAllocation extends Phase {
  constructor() {
    super(Properties.PHASE_ALLOCATION.id, [
      {
        fn: Moves.setTraitors,
        parameters: {},
        emit: {
          hideAllies: true,
        },
        duration: 300
      }
    ]);
  }
}

module.exports = PhaseAllocation;
