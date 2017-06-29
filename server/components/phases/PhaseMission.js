'use strict';

var Phase = require('./Phase');
var Moves = require('../game/Moves');
var Properties = require('../../constants/PhaseProperties');
var SocketEmissions = require('../../constants/SocketEmissions');

class PhaseMission extends Phase {
  constructor() {
    super(Properties.PHASE_MISSION.id, [
      {
        fn: Moves.wait,
        parameters: {},
        emit: {
          public: {
            settings: [SocketEmissions.SCORE]
          }
        },
        duration: -1
      },
      {
        fn: Moves.updateScore,
        parameters: {},
        emit: {},
        duration: 1000
      },
      {
        fn: Moves.updateComplete,
        parameters: {},
        emit: {},
        duration: 1000
      },
      {
        fn: Moves.updateRound,
        parameters: {},
        emit: {
          public: {
            settings: [SocketEmissions.ROUND]
          }
        },
        duration: 1
      }
    ]);
  }
}

module.exports = PhaseMission;
