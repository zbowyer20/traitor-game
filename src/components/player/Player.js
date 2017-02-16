import React, {PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classNames from 'classnames';

const Player = ({player}) => {
  let classes = classNames({
    "player": true,
    "evil": player.alignment || false
  });

  return (
    <div className={classes}>
      {player.id}
    </div>
  );
};

Player.propTypes = {
  player: PropTypes.object.isRequired
};

export default Player;
