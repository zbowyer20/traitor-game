'use strict';
var shortid = require('shortid');

function Player(id, isHost) {
  var self = {
    id: id,
    isHost: isHost,
    alignment: null
  };

  self.setAlignment = function(alignment) {
    self.alignment = alignment;
    return self;
  };

  self.getAlignment = function() {
    return self.alignment;
  }

  /**
  * Get the player's publically visible information
  * @returns {Object} currently containing the player's id, visible hand and cp.
  */
  self.getPublicPack = function() {
    return {
      id: self.id,
      isHost: self.isHost
    };
  }

  /**
  * Get the player's full data
  * @returns {Object} currently containing the player's id, hand and cp.
  */
  self.getPack = function() {
    return {
      id: self.id,
      alignment: self.getAlignment(),
      isHost: self.isHost
    };
  }

  return self;
}

/**
* Return public player data available to a given player
* @param pid {String} The id of the player data will be returned to
* @returns {Object} containing the player information and the public data
                    of his opponent
*/
Player.buildPack = function(pid) {
  return {
    me: pid,
    opponent: Object.keys(Player.list).find((id) => {
      // the player whose ID is not mine is my opponent
      return id != pid
    })
  };
}

Player.list = {};

module.exports = Player;
