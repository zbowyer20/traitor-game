'use strict';

var Phase = require('./Phase');
var Moves = require('../game/Moves');
var Properties = require('../../constants/PhaseProperties');

class PhaseStart extends Phase {
  constructor() {
    super(Properties.PHASE_START.id, [
      {
        fn: Moves.wait,
        parameters: {},
        emit: {},
        duration: -1
      },
      {
        fn: Moves.setPlayerOrder,
        parameters: {},
        emit: {},
        duration: 1000
      }
    ]);
  }
}

module.exports = PhaseStart;
