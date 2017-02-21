'use strict';
var shortid = require('shortid');

function Player(id, isHost) {
  var self = {
    id: id,
    isHost: isHost,
    traitor: false,
    order: 0
  };

  self.setTraitor = function(isTraitor) {
    self.traitor = isTraitor;
    return self;
  };

  self.isTraitor = function() {
    return self.traitor;
  }

  self.setOrder = function(order) {
    self.order = order;
  }

  /**
  * Get the player's publically visible information
  * @returns {Object} currently containing the player's id, visible hand and cp.
  */
  self.getPack = function(options) {
    return {
      id: self.id,
      isHost: self.isHost,
      isTraitor: (options.allies && options.owner.isTraitor()) || options.owner.id == self.id ? self.isTraitor() : false,
      order: self.order
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
