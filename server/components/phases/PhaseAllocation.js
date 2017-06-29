'use strict';

var Phase = require('./Phase');
var Moves = require('../game/Moves');
var Properties = require('../../constants/PhaseProperties');
var SocketEmissions = require('../../constants/SocketEmissions');

class PhaseAllocation extends Phase {
  constructor() {
    super(Properties.PHASE_ALLOCATION.id, [
      {
        fn: Moves.setTraitors,
        parameters: {},
        emit: {
          private: {
            players: [SocketEmissions.IS_TRAITOR]
          }
        },
        duration: 300
      }
    ]);
  }
}

module.exports = PhaseAllocation;
