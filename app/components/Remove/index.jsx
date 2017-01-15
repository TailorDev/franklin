import React, { PropTypes } from 'react';


const Remove = props => (
  <div className="action-remove">
    <p>
      {props.children}
    </p>
    <div className="action-buttons">
      <button
        className="button remove"
        onClick={props.onRemove}
      >
        Remove
      </button>
      <button
        className="button cancel"
        onClick={props.onCancel}
      >
        Cancel
      </button>
    </div>
  </div>
);

Remove.propTypes = {
  onRemove: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};

export default Remove;
