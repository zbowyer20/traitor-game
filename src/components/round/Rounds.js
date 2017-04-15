import React, {PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Round from './Round';

const Rounds = ({rounds, phase, player, actions}) => {
  var roundSet = [];
  for (var i = 0; i < rounds.total; i++) {
    roundSet.push(<Round number={i} current={rounds.current == i} score={rounds.score[i]} phase={phase} player={player.object} actions={actions} />)
  }

  return (
    <div className="rounds">
      {roundSet}
    </div>
  );
};

Rounds.propTypes = {
  rounds: PropTypes.object.isRequired,
  phase: PropTypes.string.isRequired,
  player: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default Rounds;
