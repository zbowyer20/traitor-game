'use strict';
var shortid = require('shortid');

function Player(id, isHost) {
  var self = {
    id: id,
    isHost: isHost,
    traitor: false,
    leader: false,
    order: 0,
    onMission: false,
    vote: null,
    mission: null
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

  self.getOrder = function() {
    return self.order;
  }

  self.isLeader = function() {
    return self.leader;
  }

  self.setLeader = function(leader) {
    self.leader = leader;
  }

  self.setOnMission = function(onMission) {
    self.onMission = onMission;
  }

  self.setVote = function(vote) {
    self.vote = vote;
  }

  self.getVote = function() {
    return self.vote;
  }

  self.getMission = function() {
    return self.mission;
  }

  self.setMission = function(mission) {
    self.mission = mission;
  }

  self.reset = function() {
    self.setVote(null);
    self.setOnMission(false);
    self.setLeader(false);
    self.setMission(null);
  }

  /**
  * Get the player's publically visible information
  * @returns {Object} currently containing the player's id, visible hand and cp.
  */
  self.getPack = function(options) {
    return {
      id: self.id,
      isHost: self.isHost,
      isTraitor: options.private || options.showTraitors || (!options.hideAllies && options.owner.isTraitor()) || options.owner.id == self.id ? self.isTraitor() : false,
      isLeader: self.leader,
      onMission: self.onMission,
      order: self.order,
      vote: options.private ? self.vote : false,
      mission: options.private ? self.mission : false
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
