import React, {PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Player from './Player';

const Players = ({players}) => {
  return (
    <div className="players">
      {players.map(player =>
        <Player key={player.id} player={player} />
      )}
    </div>
  );
};

Players.propTypes = {
  players: PropTypes.array.isRequired
};

export default Players;
