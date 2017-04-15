import React, {PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Player from './Player';
import FlipMove from 'react-flip-move';

const Players = ({players, settings, me, phase, actions}) => {
  return (
    <div className="players">
      <FlipMove duration={200} enterAnimation="elevator" leaveAnimation="elevator">
          {players.map(player =>
            <div className="player__container" key={player.id}>
              <Player key={player.id} player={player} settings={settings} me={me} phase={phase} actions={actions}/>
            </div>
          )}
      </FlipMove>
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
