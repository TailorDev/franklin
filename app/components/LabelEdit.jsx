import React, { PropTypes, Component } from 'react';

import LabelForm from './LabelForm';

const { func, object } = PropTypes;


class LabelEdit extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleActionEditCancelClick = this.handleActionEditCancelClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
  }

  handleActionEditCancelClick() {
    this.props.onActionEditCancelClick();
  }

  handleEditClick(label) {
    this.props.onLabelEdit(label);
  }

  render() {
    return (
      <div className="action-edit">
        <LabelForm
          label={this.props.label}
          onEditLabel={this.handleEditClick}
          onCancel={this.handleActionEditCancelClick}
        />
      </div>
    );
  }
}

LabelEdit.propTypes = {
  onActionEditCancelClick: func.isRequired,
  onLabelEdit: func.isRequired,
  label: object.isRequired,
};

export default LabelEdit;
