'use strict';

var Players = require('../player/Players');
var Sockets = require('../../Sockets');
var Phases = require('../phases/Phases');
var Properties = require('../../constants/GameProperties');
var SocketEmissions = require('../../constants/SocketEmissions');

function Game() {
  let self = {
    players: new Players(),
    settings: {
      mission: 0,
      ready: false,
      waiting: {
        selected: 0
      },
      rounds: {
        current: 0,
        score: [],
        total: 5
      }
    }
  };

  self.addPlayer = function(pid) {
    self.players.add(pid);
    self.settings.ready = Object.keys(Properties.players).indexOf("" + self.players.ids().length) > -1;
  }


  self.continue = function(data) {
    let parameters = {
      players: self.players,
      settings: self.settings
    };
    let next = Phases.continue(parameters);
    next.move.parameters = Object.assign(next.move.parameters, parameters);
    next.move.fn.bind(null, next.move.parameters)();
    console.log(next.move);
    Sockets.emitGame(self, next.move.emit);
    if (next.move.duration > -1) {
      setTimeout(self.continue, next.move.duration);
    }
  }

  self.setPlayerImage = function(id, file) {
    self.players.setImage(id, file.preview);
    Sockets.emitGame(self, {public: { players: [SocketEmissions.IMAGE]}});
  }

  self.setPlayersForMission = function(ids) {
    self.players.setOnMission(ids);
    self.settings.waiting.selected = self.players.ids().length;
  }

  function approvedVote() {
    return self.settings.votes > Math.floor(self.players.ids().length);
  }

  self.vote = function(id, approve) {
    self.players.get(id).setVote(approve);
    Sockets.emitPrivate(this, {players: [SocketEmissions.MISSION_VOTE]}, id);
    if (self.players.voted()) {
      self.continue();
    }
  }

  self.mission = function(id, succeed) {
    console.log("On mission:");
    console.log(id);
    console.log(succeed);
    self.players.get(id).setMission(succeed);
    Sockets.emitPrivate(this, {players: [SocketEmissions.MISSION_DECISION]}, id);
    let mission = self.players.getMission();
    if (mission.complete) {
      self.continue({
        failures: mission.failures
      })
    }
  }

  self.getPublicSettings = function(options) {
    let ret = {};
    if (options.indexOf(SocketEmissions.WAITING) > -1) {
      ret.waiting = self.settings.waiting;
      console.log("Waiting");
      console.log(ret.waiting);
    }
    if (options.indexOf(SocketEmissions.READY) > -1) {
      ret.ready = self.settings.ready;
    }
    if (options.indexOf(SocketEmissions.SCORE) > -1) {
      ret.rounds = self.settings.rounds;
    }
    if (options.indexOf(SocketEmissions.ROUND) > -1) {
      ret.rounds = self.settings.rounds;
    }
    return ret;
  }

  self.getPublicPhase = function(options) {
    return {
      id: Phases.current.id
    }
  }

  self.getPublicPack = function(id, options) {
    let ret = {};
    if (options.settings) {
      ret.settings = self.getPublicSettings(options.settings);
    }
    if (options.players) {
      ret.players = self.players.getPack(self.players.get(id), options.players);
    }
    if (options.phase) {
      ret.phase = self.getPublicPhase(options.phase);
    }
    // let ret = {
    //   phase: Phases.getCurrentPhase().getPack(),
    //   settings: self.settings,
    //   players: self.players.getPack({
    //     owner: self.players.get(id),
    //     hideAllies: options.hideAllies || false,
    //     showTraitors: options.showTraitors || false
    //   })
    // }
    return ret;
  }

  self.getPrivatePack = function(id, options) {
    return {
      me: self.players.get(id).getPack(self.players.get(id), options.players || [])
    }
  }

  self.continue();

  return self;
}

module.exports = Game;
