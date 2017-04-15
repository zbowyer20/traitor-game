'use strict';

var Players = require('../player/Players');
var Sockets = require('../../Sockets');
var Phases = require('../phases/Phases');
var Properties = require('../../constants/GameProperties');

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
    Sockets.emitGame(self, next.move.emit);
    if (next.move.duration > -1) {
      setTimeout(self.continue, next.move.duration);
    }
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
    Sockets.emitPrivate(this, {}, id);
    if (self.players.voted()) {
      self.continue();
    }
  }

  self.mission = function(id, succeed) {
    self.players.get(id).setMission(succeed);
    Sockets.emitPrivate(this, {}, id);
    let mission = self.players.getMission();
    if (mission.complete) {
      self.continue({
        failures: mission.failures
      })
    }
  }

  self.getPublicPack = function(id, options) {
    return {
      phase: Phases.getCurrentPhase().getPack(),
      settings: self.settings,
      players: self.players.getPack({
        owner: self.players.get(id),
        hideAllies: options.hideAllies || false,
        showTraitors: options.showTraitors || false
      })
    }
  }

  self.getPrivatePack = function(id, options) {
    return {
      me: self.players.get(id).getPack({
        private: true
      })
    };
  }

  self.continue();

  return self;
}

module.exports = Game;
