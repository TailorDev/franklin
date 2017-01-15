import React, { PropTypes } from 'react';
import ExonForm from './ExonForm';


const ExonEdit = props => (
  <div className="action-edit">
    <ExonForm
      exon={props.exon}
      onEditExon={props.onEditExon}
      onRemoveExon={props.onRemoveExon}
      onCancel={props.onActionEditCancelClick}
    />
  </div>
);

ExonEdit.propTypes = {
  exon: PropTypes.object.isRequired,
  onEditExon: PropTypes.func.isRequired,
  onRemoveExon: PropTypes.func.isRequired,
  onActionEditCancelClick: PropTypes.func.isRequired,
};

export default ExonEdit;
