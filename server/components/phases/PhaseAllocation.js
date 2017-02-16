'use strict';

function PhaseAllocation() {
  let self = {
    id: "PHASE_ALLOCATION",
    label: "Allocating roles"
  };
  let stages = ["setAlignment"];

  self.next = function() {
    let stage = stages.pop();
    self.complete = !stages.length;
    return stage;
  }

  self.isComplete = function() {
    return !stages.length;
  }

  self.getPack = function() {
    return {id: self.id};
  }

  return self;
}

module.exports = PhaseAllocation;
