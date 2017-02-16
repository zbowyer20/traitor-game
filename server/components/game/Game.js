'use strict';

var Player = require('../player/Player');
var Sockets = require('../../Sockets');
var Phases = require('../phases/Phases');
var shuffle = require('shuffle-array');
var clone = require('clone');

function Game() {
  let self = {
    settings: {
      ready: false
    }
  };

  self.players = {
    list: {},
    ids: {
      list: [],

      /**
      * Set the list of ids of playing players
      */
      set: function() {
        self.players.ids.list = Object.keys(self.players.list);
      },
    },

    /**
    * Add a player to the game
    * @param pid {String} The id of the player to add
    */
    add: function(pid) {
      self.players.list[pid] = Player(pid, !self.players.ids.list.length);
      self.players.ids.set();
      self.settings.ready = self.players.ids.list.length == 5
    },

    /**
    * Get a playing player by their id
    * @param pid {String} the id of the player to get
    * @returns {Player} the player, or undefined if they are not found
    */
    get: function(pid) {
      return self.players.list[pid];
    },

    remove: function(pid) {
      delete self.players.list[pid];
      self.players.ids.set();
    },

    getPublicPack: function(showAlignment) {
      var pack = [];
      for (var i = 0; i < self.players.ids.list.length; i++) {
        var id = self.players.ids.list[i];
        pack.push(self.players.list[id].getPublicPack(showAlignment));
      }
      return pack;
    }
  };

  self.continue = function() {
    self[Phases.continue()]();
    Sockets.emitGame(self);
  }

  self.wait = function() {

  }

  self.setAlignment = function() {
    let ids = clone(self.players.ids.list);
    shuffle(ids);
    for (var i = 0; i < ids.length; i++) {
      let alignment = i < 2;
      self.players.list[ids[i]].setAlignment(alignment)
    }
  }

  self.getPublicPack = function(id) {
    let showAlignment = self.players.list[id].getAlignment();
    return {
      phase: Phases.getCurrentPhase().getPack(),
      settings: self.settings,
      players: self.players.getPublicPack(showAlignment)
    }
  }

  self.getPrivatePack = function(id) {
    return {
      me: {
        id: id,
        alignment: self.players.get(id).getAlignment()
      }
    }
  }

  self.continue();

  return self;
}

module.exports = Game;
