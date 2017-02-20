'use strict';

class Phase {
  constructor(id, label, stages) {
    this.id = id;
    this.label = label;
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
