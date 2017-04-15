import React, {PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {PhaseMessages} from '../../properties/GameProperties';

const Phase = ({phase}) => {
  return (
    <div className="phase">
      {PhaseMessages[phase]}
    </div>
  );
};

Phase.propTypes = {
  phase: PropTypes.string.isRequired
};

export default Phase;
