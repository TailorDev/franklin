import React, { PropTypes, Component } from 'react';

const { bool, func, string } = PropTypes;

import LabelEdit from './LabelEdit';
import LabelRemove from './LabelRemove';
import LabelTools from './LabelTools';


class Label extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      displayRemoveForm: false,
      displayEditForm: false,
    };

    this.toggleActionRemove = this.toggleActionRemove.bind(this);
    this.toggleActionEdit = this.toggleActionEdit.bind(this);
    this.handleToggleLabel = this.handleToggleLabel.bind(this);
    this.handleLabelEdit = this.handleLabelEdit.bind(this);
    this.handleLabelRemove = this.handleLabelRemove.bind(this);
  }

  toggleActionRemove() {
    this.setState({
      displayRemoveForm: !this.state.displayRemoveForm,
    });
  }

  toggleActionEdit() {
    this.setState({
      displayEditForm: !this.state.displayEditForm,
    });
  }

  handleToggleLabel() {
    this.props.onToggleLabel();
  }

  handleLabelEdit(label) {
    this.props.onEditLabel(label);
    this.toggleActionEdit();
  }

  handleLabelRemove() {
    this.props.onRemoveLabel();
    this.toggleActionRemove();
  }

  render() {
    return (
      <li
        className={
          `label
            ${this.state.displayRemoveForm ? 'in-action remove' : ''}
            ${this.state.displayEditForm ? 'in-action edit' : ''}
            ${this.props.isActive ? null : 'inactive'}`
        }
      >
        <span
          className="label-name"
          onClick={this.handleToggleLabel}
        >
          <i className="fa fa-tag" aria-hidden="true" style={{ color: this.props.color }}></i>
          {this.props.name}
        </span>

        <LabelTools
          onActionToggleClick={this.handleToggleLabel}
          onActionEditClick={this.toggleActionEdit}
          onActionRemoveClick={this.toggleActionRemove}
        />

        {this.state.displayRemoveForm ?
          <LabelRemove
            onActionRemoveCancelClick={this.toggleActionRemove}
            onLabelRemove={this.handleLabelRemove}
          /> : null
        }

        {this.state.displayEditForm ?
          <LabelEdit
            onActionEditCancelClick={this.toggleActionEdit}
            onLabelEdit={this.handleLabelEdit}
            label={this.props}
          /> : null
        }
      </li>
    );
  }
}

Label.propTypes = {
  name: string.isRequired,
  color: string.isRequired,
  isActive: bool.isRequired,
  onToggleLabel: func.isRequired,
  onEditLabel: func.isRequired,
  onRemoveLabel: func.isRequired,
};

export default Label;
