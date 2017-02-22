import React, {PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classNames from 'classnames';
import ActionButton from '../actions/ActionButton';

const Player = ({player, settings, me, phase, actions}) => {
  let classes = classNames({
    "player": true,
    "traitor": player.isTraitor || false,
    "leader": player.isLeader || false,
    "selectedForMission": settings.selectedPlayers.indexOf(player.id) > -1 || false
  });

  return (
    <div className={classes}>
      {player.id} {player.order > 0 && "(Order: " + player.order + ")"}
      {me.isLeader && phase.id == "PHASE_CHOOSE_PLAYERS_FOR_MISSION" && <ActionButton label="Select" ev={() => actions.choosePlayerForMission(player.id)} />}
    </div>
  );
};

Player.propTypes = {
  player: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  me: PropTypes.object.isRequired,
  phase: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default Player;
