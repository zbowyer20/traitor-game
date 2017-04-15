import React, {PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classNames from 'classnames';
import ActionButton from '../actions/ActionButton';
import TokenLeader from '../token/TokenLeader';
import TokenMission from '../token/TokenMission';

const Player = ({player, settings, me, phase, actions}) => {
  let classes = classNames({
    "player": true,
    "traitor": player.isTraitor || false,
    "resistance": !player.isTraitor && (me.isTraitor || me.id == player.id),
    "me": player.id == me.id
  });

  function selectedForMission() {
    return settings.selectedPlayers.indexOf(player.id) > -1 || player.onMission;
  }

  function getFaction(player, me) {
    if (player.isTraitor) {
      return "TRAITORS";
    } else if (me.isTraitor || player.id == me.id) {
        return "RESISTANCE";
    } else {
        return "UNKNOWN";
    }
  }

  console.log("About today");
  console.log(me);
  console.log(me.isLeader);
  console.log(phase.id);

  return (
    <div className={classes}>
      {me.isLeader && phase.id == "PHASE_CHOOSE_PLAYERS_FOR_MISSION" && <ActionButton label="✓" options={{rounded: true, top: true, selected: selectedForMission()}} ev={() => actions.choosePlayerForMission(player.id)} />}
      <div className="player_image_container">
        <img className="player_image" src="http://placehold.it/150x150" />
        {player.isLeader && <TokenLeader />}
        {selectedForMission() && <TokenMission />}
      </div>
      <div className="player_information">
        <span className="player_name">{player.id}{player.id==me.id && <span> (You)</span>}</span>
        FACTION: <span className="player_faction">{getFaction(player, me)}</span>
        <span className="player_order">{player.order}</span>
      </div>
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
