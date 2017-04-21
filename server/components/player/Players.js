'use strict';
var Player = require('./Player');
var shuffle = require('shuffle-array');
var clone = require('clone');

function Players() {
  var self = {
    set: {},
    leader: 0
  };

  self.add = function(pid) {
    self.set[pid] = Player(pid, !self.ids().length, self.ids().length);
  }

  /**
  * Get a playing player by their id
  * @param pid {String} the id of the player to get
  * @returns {Player} the player, or undefined if they are not found
  */
  self.get = function(pid) {
    return self.set[pid];
  }

  self.remove = function(pid) {
    delete self.set[pid];
  }

  self.ids = function() {
    return Object.keys(self.set);
  }

  self.setImage = function(id, file) {
    self.set[id].setImage(file);
  }

  function getShuffledIds() {
    return shuffle(clone(self.ids()));
  }

  self.setTraitors = function() {
    let ids = getShuffledIds();
    ids.splice(0, Math.floor(ids.length / 2)).map(id => {
      self.set[id].setTraitor(true);
    });
  }

  self.setOrder = function() {
    let i = 1;
    getShuffledIds().map(id => {
      self.set[id].setOrder(i);
      i++;
    })
  }

  function setLeader() {
    self.ids().map(id => {
      let player = self.set[id];
      player.setLeader(player.getOrder() == self.leader);
    })
  }

  self.nextLeader = function() {
    self.leader = self.leader == self.ids().length ? 1 : ++self.leader;
    setLeader();
  }

  self.setOnMission = function(ids) {
    self.ids().filter(id => ids.indexOf(id) > -1).forEach(id => {
      self.get(id).setOnMission(true);
    });
  }

  self.voted = function() {
    return self.ids().filter(id => {
      return self.get(id).getVote() == null
    }).length == 0;
  }

  self.approvedVote = function() {
    return self.ids().filter(id => { return self.get(id).getVote() }).length > Math.floor(self.ids().length / 2);
  }

  self.getMissionPids = function() {
    return self.ids().filter(id => {
      return self.get(id).onMission;
    });
  }

  self.getMission = function() {
    let missionPlayers = self.getMissionPids();
    let complete = missionPlayers.filter(id => {
      return self.get(id).getMission() == null
    }).length == 0;
    let failures = missionPlayers.filter(id => {
      return !self.get(id).getMission()
    }).length;
    return {
      complete: complete,
      failures: failures
    }
  }

  self.reset = function() {
    self.ids().map(id => {
      let player = self.set[id];
      player.reset();
    });
  }

  self.getPack = function(options) {
    return self.ids().map(id => self.set[id].getPack(options)).sort((a, b) => a.order - b.order);
  }

  return self;
}

module.exports = Players;
