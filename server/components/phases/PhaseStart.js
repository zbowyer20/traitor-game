'use strict';

var Phase = require('./Phase');
var Moves = require('../game/Moves');
var Properties = require('../../constants/PhaseProperties');
var SocketEmissions = require('../../constants/SocketEmissions');

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
        emit: {
          public: {
            players: [SocketEmissions.PLAYER_ORDER],
            settings: [SocketEmissions.SCORE]
          }
        },
        duration: 1000
      }
    ]);
  }
}

module.exports = PhaseStart;
