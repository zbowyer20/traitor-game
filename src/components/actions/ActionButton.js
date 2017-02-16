import React, {PropTypes} from 'react';

const ActionButton = ({label, ev}) => {
  return (
    <div className="action">
      <button onClick={ev}>{label}</button>
    </div>
  );
};

ActionButton.propTypes = {
  label: PropTypes.string.isRequired,
  ev: PropTypes.func.isRequired
};

export default ActionButton;
