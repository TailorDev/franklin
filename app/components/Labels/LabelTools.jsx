import React, { PropTypes } from 'react';


const LabelTools = props => (
  <span className="label-tools">
    <i
      className="fa fa-adjust toggle"
      aria-hidden="true"
      title="Hide/Show"
      onClick={props.onActionToggleClick}
    />
    <i
      className="fa fa-pencil edit"
      aria-hidden="true"
      title="Edit"
      onClick={props.onActionEditClick}
    />
    <i
      className="fa fa-trash-o remove"
      aria-hidden="true"
      title="Remove"
      onClick={props.onActionRemoveClick}
    />
  </span>
);

LabelTools.propTypes = {
  onActionToggleClick: PropTypes.func.isRequired,
  onActionEditClick: PropTypes.func.isRequired,
  onActionRemoveClick: PropTypes.func.isRequired,
};

export default LabelTools;
