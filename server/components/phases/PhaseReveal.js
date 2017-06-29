'use strict';

var Phase = require('./Phase');
var Moves = require('../game/Moves');
var Properties = require('../../constants/PhaseProperties');
var SocketEmissions = require('../../constants/SocketEmissions');

class PhaseReveal extends Phase {
  constructor() {
    super(Properties.PHASE_REVEAL.id, [
      {
        fn: Moves.reveal,
        parameters: {},
        emit: {
          public: {
            players: [SocketEmissions.IS_TRAITOR]
          }
        },
        duration: 1000
      }
    ]);
  }
}

module.exports = PhaseReveal;
