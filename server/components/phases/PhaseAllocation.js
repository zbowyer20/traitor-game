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
        emit: {},
        duration: 5000
      }
    ]);
  }
}

module.exports = PhaseAllocation;
