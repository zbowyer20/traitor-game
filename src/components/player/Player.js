import React, {PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classNames from 'classnames';

const Player = ({player}) => {
  let classes = classNames({
    "player": true,
    "traitor": player.isTraitor || false
  });

  return (
    <div className={classes}>
      {player.id} {player.order > 0 && "(Order: " + player.order + ")"}
    </div>
  );
};

Player.propTypes = {
  player: PropTypes.object.isRequired
};

export default Player;
