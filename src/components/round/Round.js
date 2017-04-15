import React, {PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classNames from 'classnames';
import ActionButton from '../actions/ActionButton';

const Round = ({number, current, score, phase, player, actions}) => {
  let classes = classNames({
    "round": true,
    "success": score == true,
    "fail": score == false
  });

console.log("Look at me I'm Mr. Meseeks");
console.log(player);

  return (
    <div className="round_container">
      <div className={classes}>
        {current && phase == "PHASE_MISSION" && player.onMission && <ActionButton label="✓" options={{selected: player.mission == true, disabled: player.mission != null, rounded: true}} ev={() => actions.mission(player.id, true)} />}
        {current && phase == "PHASE_MISSION" && player.onMission && <ActionButton label="✗" options={{selected: player.mission == false, disabled: player.mission != null, rounded: true}} ev={() => actions.mission(player.id, false)} />}
      </div>
      {current && phase == "PHASE_VOTE" && <ActionButton label="✓" options={{selected: player.vote == true, rounded: true}} ev={() => {actions.vote(player.id, true)}} />}
      {current && phase == "PHASE_VOTE" && <ActionButton label="✗" options={{selected: player.vote == false, rounded: true}} ev={() => {actions.vote(player.id, false)}} />}
    </div>
  );
};

Round.propTypes = {
  number: PropTypes.number.isRequired,
  current: PropTypes.bool.isRequired,
  round: PropTypes.bool,
  phase: PropTypes.string.isRequired,
  player: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default Round;
