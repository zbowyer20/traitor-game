import React, {PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
const Phase = ({phase}) => {
  return (
    <div className="phase">
      {phase}
    </div>
  );
};

Phase.propTypes = {
  phase: PropTypes.string.isRequired
};

export default Phase;
