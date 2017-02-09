import React, {PropTypes} from 'react';
const Me = ({player}) => {
  return (
    <div className="me">
      {player.id}
    </div>
  );
};

Me.propTypes = {
  player: PropTypes.object.isRequired
};

export default Me;
