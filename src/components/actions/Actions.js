import React, {PropTypes} from 'react';
import ActionStartGame from './ActionStartGame';

const Actions = ({player, game}) => {
  return (
    <div className="actions">
      {game.settings.ready && player.isHost && <ActionStartGame />}
    </div>
  );
};

Actions.propTypes = {
  player: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired
};

export default Actions;
