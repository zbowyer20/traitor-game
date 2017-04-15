'use strict';

var Phase = require('./Phase');
var Moves = require('../game/Moves');
var Properties = require('../../constants/PhaseProperties');

class PhaseReveal extends Phase {
  constructor() {
    super(Properties.PHASE_REVEAL.id, [
      {
        fn: Moves.reveal,
        parameters: {},
        emit: {
          showTraitors: true
        },
        duration: 1000
      }
    ]);
  }
}

module.exports = PhaseReveal;
