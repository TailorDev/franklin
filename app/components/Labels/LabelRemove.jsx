import React, { PropTypes } from 'react';


const LabelRemove = (props) => (
  <div className="action-remove">
    <p>
      Are you sure you want to remove this label and related annotations?
    </p>
    <div className="action-buttons">
      <button
        className="remove"
        onClick={props.onLabelRemove}
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

LabelRemove.propTypes = {
  onLabelRemove: PropTypes.func.isRequired,
  onActionRemoveCancelClick: PropTypes.func.isRequired,
};

export default LabelRemove;
