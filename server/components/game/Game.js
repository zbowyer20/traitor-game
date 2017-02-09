'use strict';

var Field = require('../field/Field');
var Player = require('../player/Player');
var Sockets = require('../../Sockets');

function Game() {
  let self = {
    phase: "PHASE_START",
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
      return self.players.find(player => {
        return player.id == pid;
      })
    },

    remove: function(pid) {
      delete self.players.list[pid];
      self.players.ids.set();
    },

    getPublicPack: function() {
      var pack = [];
      for (var i = 0; i < self.players.ids.list.length; i++) {
        var id = self.players.ids.list[i];
        pack.push(self.players.list[id].getPublicPack());
      }
      return pack;
    }

  };

  self.getPublicPack = function() {
    return {
      ids: self.players.ids.list,
      data: {
        phase: self.phase,
        settings: self.settings,
        players: self.players.getPublicPack()
      }
    }
  }

  return self;
}

module.exports = Game;
