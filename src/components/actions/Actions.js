import React, {PropTypes} from 'react';
import ActionButton from './ActionButton';

const Actions = ({player, game, actions}) => {
  return (
    <div className="actions">
      {game.settings.ready && player.isHost && <ActionButton label="Start Game" ev={actions.startGame}/>}
    </div>
  );
};

Actions.propTypes = {
  player: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default Actions;
