import React, {PropTypes} from 'react';
import classNames from 'classnames';

const ActionButton = ({label, options, ev}) => {
  let containerClasses = classNames({
    "action": true,
    "top": options ? options.top : false
  });
  let classes = classNames({
    "selected": options ? options.selected : false,
    "rounded": options ? options.rounded : false
  });

  return (
    <div className={containerClasses}>
      <button disabled={options ? options.disabled : false} className={classes} onClick={ev}>{label}</button>
    </div>
  );
};

ActionButton.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.object,
  ev: PropTypes.func.isRequired
};

export default ActionButton;
