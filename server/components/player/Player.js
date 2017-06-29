'use strict';
var shortid = require('shortid');
var SocketEmissions = require('../../constants/SocketEmissions');

function Player(id, isHost) {
  var self = {
    id: id,
    image: "http://placehold.it/150x150",
    isHost: isHost,
    traitor: null,
    leader: false,
    order: 0,
    onMission: false,
    vote: null,
    mission: null
  };

  self.setImage = function(file) {
    self.image = file;
  };

  self.getImage = function() {
    return self.image;
  }

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

  self.suggestedForMission = function() {
    return self.onMission;
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
  self.getPack = function(asker, options) {
    let ret = {
      id: self.id
    };
    console.log("And the options are...");
    console.log(options);
    if (options.indexOf(SocketEmissions.IMAGE) > -1) {
      ret.image = self.getImage();
    }
    if (options.indexOf(SocketEmissions.HOST) > -1) {
      ret.isHost = self.isHost;
    }
    if (options.indexOf(SocketEmissions.IS_TRAITOR) > -1) {
      ret.isTraitor = self.isTraitor();
    }
    if (options.indexOf(SocketEmissions.MISSION_SUGGESTION) > -1) {
      ret.suggestedForMission = self.suggestedForMission();
    }
    if (options.indexOf(SocketEmissions.MISSION_LEADER) > -1) {
      console.log("Am I a leader?");
      ret.isLeader = self.isLeader();
    }
    if (options.indexOf(SocketEmissions.ALLIES) > -1) {
      ret.isTraitor = asker.isTraitor() ? self.isTraitor() : (asker.id == self.id ? false : null);
    }
    if (options.indexOf(SocketEmissions.PLAYER_ORDER) > -1 || true) {
      ret.order = self.getOrder();
    }
    if (options.indexOf(SocketEmissions.MISSION_PLAYERS) > -1) {
      ret.onMission = self.onMission;
    }
    if (options.indexOf(SocketEmissions.MISSION_VOTE) > -1) {
      ret.vote = self.vote;
    }
    if (options.indexOf(SocketEmissions.MISSION_DECISION) > -1) {
      ret.mission = self.mission;
    }
    return ret;
    // return {
    //   id: self.id,
    //   image: self.image.preview,
    //   isHost: self.isHost,
    //   isTraitor: options.private || options.showTraitors || (!options.hideAllies && options.owner.isTraitor()) || options.owner.id == self.id ? self.isTraitor() : false,
    //   isLeader: self.leader,
    //   onMission: self.onMission,
    //   order: self.order,
    //   vote: options.private ? self.vote : false,
    //   mission: options.private ? self.mission : false
    // };
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
