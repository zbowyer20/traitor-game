import React, {PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Player from './Player';

const Players = ({players, settings, me, phase, actions}) => {
  return (
    <div className="players">
      {players.map(player =>
        <Player key={player.id} player={player} settings={settings} me={me} phase={phase} actions={actions}/>
      )}
    </div>
  );
};

Players.propTypes = {
  players: PropTypes.array.isRequired,
  settings: PropTypes.object.isRequired,
  me: PropTypes.object.isRequired,
  phase: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default Players;
