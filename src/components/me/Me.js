import React, {PropTypes} from 'react';
import classNames from 'classnames';

const Me = ({player}) => {
  let classes = classNames({
    "me": true,
    "traitor": player.isTraitor || false
  });

  return (
    <div className={classes}>
      {player.id}
    </div>
  );
};

Me.propTypes = {
  player: PropTypes.object.isRequired
};

export default Me;
