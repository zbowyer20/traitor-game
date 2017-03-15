import React, {PropTypes} from 'react';
import ActionButton from './ActionButton';

const Actions = ({player, game, actions}) => {
  return (
    <div className="actions">
      {game.phase.id == "PHASE_START" && game.settings.ready && player.isHost && <ActionButton label="Start Game" ev={actions.startGame}/>}
      {game.phase.id == "PHASE_CHOOSE_PLAYERS_FOR_MISSION" && player.isLeader && game.settings.waiting.players == game.settings.selectedPlayers.length && <ActionButton label="Select" ev={() => actions.choosePlayersForMission(game.settings.selectedPlayers)} />}
      {game.phase.id == "PHASE_VOTE" && <ActionButton label="Yes" ev={() => { console.log("I just voted and my ID is: " + player.id); actions.vote(player.id, true)}} />}
      {game.phase.id == "PHASE_VOTE" && <ActionButton label="No" ev={() => actions.vote(player.id, false)} />}
      {game.phase.id == "PHASE_MISSION" && player.onMission && <ActionButton label="Success" ev={() => actions.mission(player.id, true)} />}
      {game.phase.id == "PHASE_MISSION" && player.onMission && <ActionButton label="Fail" ev={() => actions.mission(player.id, false)} />}
    </div>
  );
};

Actions.propTypes = {
  player: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default Actions;
