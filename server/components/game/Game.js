'use strict';

var Players = require('../player/Players');
var Sockets = require('../../Sockets');
var Phases = require('../phases/Phases');

function Game() {
  let self = {
    players: new Players(),
    settings: {
      ready: false
    }
  };

  self.addPlayer = function(pid) {
    self.players.add(pid);
    self.settings.ready = self.players.ids().length == 5;
  }

  self.continue = function() {
    let move = Phases.continue();
    move.parameters.players = self.players;
    move.fn.bind(null, move.parameters)();
    Sockets.emitGame(self, move.emit);
    if (move.duration > -1) {
      setTimeout(self.continue, move.duration);
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
