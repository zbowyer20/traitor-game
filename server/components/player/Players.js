'use strict';
var Player = require('./Player');
var shuffle = require('shuffle-array');
var clone = require('clone');

function Players() {
  var self = {
    set: {},
    leader: 1
  };

  self.add = function(pid) {
    self.set[pid] = Player(pid, !self.ids().length);
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
    setLeader();
  }

  function setLeader() {
    self.ids().map(id => {
      let player = self.set[id];
      player.setLeader(player.getOrder() == self.leader);
    })
  }

  self.nextLeader = function() {
    self.currentLeader = self.currentLeader == self.ids().length ? 1 : self.currentLeader++;
    setLeader();
  }

  self.getPack = function(options) {
    return self.ids().map(id => self.set[id].getPack(options));
  }

  return self;
}

module.exports = Players;
