import React, { PropTypes } from 'react';


const ExonRemove = (props) => (
  <div className="action-remove">
    <p>
      Are you sure you want to remove this exon?
    </p>
    <div className="action-buttons">
      <button
        className="button remove"
        onClick={props.onRemoveExon}
      >
        Remove
      </button>
      <button
        className="button cancel"
        onClick={props.onActionRemoveCancelClick}
      >
        Cancel
      </button>
    </div>
  </div>
);

ExonRemove.propTypes = {
  onRemoveExon: PropTypes.func.isRequired,
  onActionRemoveCancelClick: PropTypes.func.isRequired,
};

export default ExonRemove;
