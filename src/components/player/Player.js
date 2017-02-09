import React, {PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
const Player = ({player}) => {
  return (
    <div className="player">
      {player.id}
    </div>
  );
};

Player.propTypes = {
  player: PropTypes.object.isRequired
};

export default Player;
