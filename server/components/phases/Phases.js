'use strict';
var PhaseStart = require('./PhaseStart');
var PhaseAllocation = require('./PhaseAllocation');
var PhaseRevealAllies = require('./PhaseRevealAllies');
var PhaseChoosePlayersForMission = require('./PhaseChoosePlayersForMission');

module.exports = {
  current: {
    id: null,
    phase: null
  },

  continue() {
    if (!this.current.phase || this.current.phase.isComplete()) {
      this.current.id = this.current.id ? this.list[this.current.id].next : "PHASE_START";
      this.current.phase = new this.list[this.current.id]["phase"]();
    }
    return this.current.phase.next();
  },

  getCurrentPhase() {
    return this.current.phase;
  },

  list: {
    PHASE_START: {
      phase: PhaseStart,
      next: "PHASE_ALLOCATION"
    },
    PHASE_ALLOCATION: {
      phase: PhaseAllocation,
      next: "PHASE_REVEAL_ALLIES"
    },
    PHASE_REVEAL_ALLIES: {
      phase: PhaseRevealAllies,
      next: "PHASE_CHOOSE_PLAYERS_FOR_MISSION"
    },
    PHASE_CHOOSE_PLAYERS_FOR_MISSION: {
      phase: PhaseChoosePlayersForMission,
      next: "PHASE_VOTE"
    }
  }
}
