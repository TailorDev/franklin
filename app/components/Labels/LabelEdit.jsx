import React, { PropTypes } from 'react';
import LabelForm from './LabelForm';


const LabelEdit = props => (
  <div className="action-edit">
    <LabelForm
      label={props.label}
      onEditLabel={props.onLabelEdit}
      onCancel={props.onActionEditCancelClick}
    />
  </div>
);

LabelEdit.propTypes = {
  label: PropTypes.object.isRequired,
  onLabelEdit: PropTypes.func.isRequired,
  onActionEditCancelClick: PropTypes.func.isRequired,
};

export default LabelEdit;
