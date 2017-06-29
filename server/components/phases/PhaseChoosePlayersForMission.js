'use strict';

var Phase = require('./Phase');
var Moves = require('../game/Moves');
var Properties = require('../../constants/PhaseProperties');
var SocketEmissions = require('../../constants/SocketEmissions');

class PhaseChoosePlayersForMission extends Phase {
  constructor() {
    super(Properties.PHASE_CHOOSE_PLAYERS_FOR_MISSION.id, [
      {
        fn: Moves.resetPlayers,
        parameters: {},
        emit: {
          public: {
            players: [SocketEmissions.MISSION_SUGGESTION, SocketEmissions.ON_MISSION, SocketEmissions.MISSION_VOTE, SocketEmissions.MISSION_PLAYERS]
          },
          private: {
            players: [SocketEmissions.ON_MISSION, SocketEmissions.MISSION_SUGGESTION, SocketEmissions.MISSION_VOTE, SocketEmissions.MISSING_PLAYERS, SocketEmissions.MISSION_DECISION]
          }
        },
        duration: 100
      },
      {
        fn: Moves.nextLeader,
        parameters: {},
        emit: {
          public: {
            players: [SocketEmissions.MISSION_LEADER]
          },
          private: {
            players: [SocketEmissions.MISSION_LEADER]
          }
        },
        duration: 100
      },
      {
        fn: Moves.choosePlayersForMission,
        parameters: {},
        emit: {
          public: {
            players: [SocketEmissions.MISSION_SUGGESTION],
            settings: [SocketEmissions.WAITING]
          }
        },
        duration: -1
      }
    ]);
  }
}

module.exports = PhaseChoosePlayersForMission;
