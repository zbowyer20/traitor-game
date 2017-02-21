'use strict';

var Properties = require('../../constants/PhaseProperties');

class Phase {
  constructor(id, stages) {
    this.id = id;
    this.label = Properties[id].label;
    this.stages = stages;
  }

  next() {
    let stage = this.stages.pop();
    return stage;
  }

  isComplete() {
    return !this.stages.length;
  }

  getPack() {
    return {id: this.id};
  }
}

module.exports = Phase;
