import React, { PropTypes, Component } from 'react';

const { object, func } = PropTypes;

import LabelEdit from './LabelEdit';
import LabelTools from './LabelTools';
import Remove from '../Remove';


class Label extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      displayRemoveForm: false,
      displayEditForm: false,
    };

    this.toggleActionRemove = this.toggleActionRemove.bind(this);
    this.toggleActionEdit = this.toggleActionEdit.bind(this);
    this.handleLabelEdit = this.handleLabelEdit.bind(this);
    this.handleLabelRemove = this.handleLabelRemove.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.label.isActive !== nextProps.label.isActive ||
      this.props.label.color !== nextProps.label.color ||
      this.props.label.name !== nextProps.label.name;
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
            ${this.props.label.isActive ? null : 'inactive'}`
        }
      >
        <span
          className="label-name"
          onClick={this.props.onToggleLabel}
        >
          <i
            className="fa fa-tag"
            aria-hidden="true"
            style={{ color: this.props.label.color }}
          ></i>
          {this.props.label.name}
        </span>

        <LabelTools
          onActionToggleClick={this.props.onToggleLabel}
          onActionEditClick={this.toggleActionEdit}
          onActionRemoveClick={this.toggleActionRemove}
        />

        {this.state.displayRemoveForm ?
          <Remove
            onCancel={this.toggleActionRemove}
            onRemove={this.handleLabelRemove}
          >
            Are you sure you want to remove this label and its related annotations?
          </Remove> : null
        }

        {this.state.displayEditForm ?
          <LabelEdit
            onActionEditCancelClick={this.toggleActionEdit}
            onLabelEdit={this.handleLabelEdit}
            label={this.props.label}
          /> : null
        }
      </li>
    );
  }
}

Label.propTypes = {
  label: object.isRequired,
  onToggleLabel: func.isRequired,
  onEditLabel: func.isRequired,
  onRemoveLabel: func.isRequired,
};

export default Label;
