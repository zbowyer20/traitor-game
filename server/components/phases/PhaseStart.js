'use strict';

function PhaseStart() {
  let self = {
    id: "PHASE_START",
    label: "Players joining...",
    complete: false
  };
  let stages = ["onStart", "onEnd"];

  self.next = function() {
    let stage = stages.pop();
    self[stage]();
    self.complete = !stages.length;
  }

  self.onStart = function() {

  }

  self.onEnd = function() {

  }

  self.isComplete = function() {
    return self.complete;
  }

  self.getPack = function() {
    return {id: self.id};
  }

  return self;
}

module.exports = PhaseStart;
