'use strict';

var Phase = require('./Phase');
var Moves = require('../game/Moves');
var Properties = require('../../constants/PhaseProperties');
var SocketEmissions = require('../../constants/SocketEmissions');

class PhaseVote extends Phase {
  constructor() {
    super(Properties.PHASE_VOTE.id, [
      {
        fn: Moves.wait,
        parameters: {},
        emit: {
          public: {
            players: [SocketEmissions.MISSION_PLAYERS]
          },
          private: {
            players: [SocketEmissions.MISSION_PLAYERS]
          }
        },
        duration: -1
      },
      {
        fn: Moves.updateMissionTracker,
        parameters: {},
        emit: {},
        duration: 100
      },
      {
        fn: Moves.updateComplete,
        parameters: {},
        emit: {},
        duration: 100
      }
    ]);
  }
}

module.exports = PhaseVote;
