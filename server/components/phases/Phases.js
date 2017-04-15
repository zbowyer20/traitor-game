'use strict';
var PhaseStart = require('./PhaseStart');
var PhaseAllocation = require('./PhaseAllocation');
var PhaseRevealAllies = require('./PhaseRevealAllies');
var PhaseChoosePlayersForMission = require('./PhaseChoosePlayersForMission');
var PhaseVote = require('./PhaseVote');
var PhaseMission = require('./PhaseMission');
var PhaseReveal = require('./PhaseReveal');

module.exports = {
  current: {
    id: null,
    phase: null
  },

  continue(data) {
    // if this is the start of the game, or the current phase is complete
    let options = {};
    if (!this.current.phase || this.current.phase.isComplete()) {
      // update to the next, or first, phase
      let next = this.current.id ? this.list[this.current.id].next(data) : {phase: "PHASE_START", options: {}};
      options = next.options;
      this.current.id = next.phase;
      this.current.phase = new this.list[this.current.id]["phase"]();
    }
    return {
      move: this.current.phase.next(),
      options: options
    };
  },

  getCurrentPhase() {
    return this.current.phase;
  },

  list: {
    PHASE_START: {
      phase: PhaseStart,
      next: () => {
        return {
          phase: "PHASE_ALLOCATION"
        }
      }
    },
    PHASE_ALLOCATION: {
      phase: PhaseAllocation,
      next: () => {
        return {
          phase: "PHASE_REVEAL_ALLIES"
        }
      }
    },
    PHASE_REVEAL_ALLIES: {
      phase: PhaseRevealAllies,
      next: () => {
        return {
          phase: "PHASE_CHOOSE_PLAYERS_FOR_MISSION"
        }
      }
    },
    PHASE_CHOOSE_PLAYERS_FOR_MISSION: {
      phase: PhaseChoosePlayersForMission,
      next: () => {
        return {
          phase: "PHASE_VOTE"
        }
      }
    },
    PHASE_VOTE: {
      phase: PhaseVote,
      next: (data) => {
        return data.players.approvedVote() ? {
            phase: "PHASE_MISSION"
        } : data.settings.complete ? {
          phase: "PHASE_REVEAL"
        } : {
          phase: "PHASE_CHOOSE_PLAYERS_FOR_MISSION"
        }
      }
    },
    PHASE_MISSION: {
      phase: PhaseMission,
      next: (data) => {
        return data.settings.complete ? {
          phase: "PHASE_REVEAL"
        } : {
          phase: "PHASE_CHOOSE_PLAYERS_FOR_MISSION"
        }
      }
    },
    PHASE_REVEAL: {
      phase: PhaseReveal,
      next: () => {
        return {
          phase: "PHASE_COMPLETE"
        }
      }
    }
  }
}
