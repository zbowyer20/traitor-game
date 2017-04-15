'use strict';

var Properties = require('../../constants/PhaseProperties');

class Phase {
  constructor(id, stages) {
    this.id = id;
    this.label = Properties[id].label;
    this.stages = stages;
    this.counter = 0;
  }

  next() {
    return this.stages[this.counter++];
  }

  isComplete() {
    return this.counter == this.stages.length;
  }

  getPack() {
    return {id: this.id};
  }
}

module.exports = Phase;
