import React, { PropTypes } from 'react';


const Remove = (props) => (
  <div className="action-remove">
    <p>
      Are you sure you want to remove this annotation?
    </p>
    <div className="action-buttons">
      <button
        className="remove"
        onClick={props.onRemove}
      >
        Remove
      </button>
      <button
        className="cancel"
        onClick={props.onActionRemoveCancelClick}
      >
        Cancel
      </button>
    </div>
  </div>
);

Remove.propTypes = {
  onRemove: PropTypes.func.isRequired,
  onActionRemoveCancelClick: PropTypes.func.isRequired,
};

export default Remove;
