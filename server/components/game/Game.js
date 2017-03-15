'use strict';

var Players = require('../player/Players');
var Sockets = require('../../Sockets');
var Phases = require('../phases/Phases');
var Properties = require('../../constants/GameProperties');

function Game() {
  let self = {
    players: new Players(),
    settings: {
      round: 0,
      ready: false,
      waiting: {
        selected: 0
      }
    }
  };

  self.addPlayer = function(pid) {
    self.players.add(pid);
    self.settings.ready = Object.keys(Properties.players).indexOf("" + self.players.ids().length) > -1;
  }

  self.continue = function(data) {
    let next = Phases.continue(data);
    if (next.options.reset) {
      self.players.reset();
    }
    if (next.options.player) {
      self.players.nextLeader();
    }
    if (next.options.round) {
      self.settings.round++;
    }
    let move = next.move;
    move.parameters.players = self.players;
    move.parameters.settings = self.settings;
    move.fn.bind(null, move.parameters)();
    Sockets.emitGame(self, move.emit);
    if (move.duration > -1) {
      setTimeout(self.continue, move.duration);
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
    if (self.players.voted()) {
      self.continue({
        approve: self.players.approvedVote()
      });
    }
  }

  self.mission = function(id, succeed) {
    self.players.get(id).setMission(succeed);
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
        hideAllies: options.hideAllies || false
      })
    }
  }

  self.getPrivatePack = function(id, options) {
    return {
      me: {
        id: id,
      }
    }
  }

  self.continue();

  return self;
}

module.exports = Game;
