'use strict';

function PhaseStart() {
  let self = {
    id: "PHASE_START",
    label: "Players joining..."
  };
  let stages = ["wait"];

  self.next = function() {
    let stage = stages.pop();
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

module.exports = PhaseStart;
