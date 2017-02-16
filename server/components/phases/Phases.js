'use strict';
var PhaseStart = require('./PhaseStart');

module.exports = {
  current: {
    id: null,
    phase: null
  },

  continue() {
    if (!this.current.phase || this.current.phase.isComplete()) {
      this.current.id = this.current.id ? Phases.list[Phrases.list[this.current.id].next].id : "PHASE_START";
      this.current.phase = new this.list.PHASE_START["phase"]();
    }
    this.current.phase.next();
  },

  getCurrentPhase() {
    return this.current.phase;
  },

  list: {
    PHASE_START: {
      phase: PhaseStart,
      next: "PHASE_ALLOCATION"
    }
  }
}
