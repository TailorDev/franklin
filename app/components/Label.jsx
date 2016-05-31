import React, { PropTypes, Component } from 'react';

const { bool, func, string } = PropTypes;

import LabelTools from './LabelTools';
import LabelRemove from './LabelRemove';


class Label extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      displayRemoveForm: false,
    };

    this.toggleActionRemove = this.toggleActionRemove.bind(this);
    this.handleActivateLabel = this.handleActivateLabel.bind(this);
    this.handleLabelRemove = this.handleLabelRemove.bind(this);
  }

  toggleActionRemove() {
    this.setState({
      displayRemoveForm: !this.state.displayRemoveForm,
    });
  }

  handleActivateLabel() {
    this.props.onActivateLabel();
  }

  handleLabelRemove() {
    this.props.onRemoveLabel();
  }

  render() {
    return (
      <li
        className={
          `label
            ${this.state.displayRemoveForm ? 'in-action remove' : ''}
            ${this.props.isActive ? null : 'inactive'}`
        }
      >
        <span
          className="label-name"
          onClick={this.handleActivateLabel}
        >
          <i className="fa fa-tag" aria-hidden="true" style={{ color: this.props.color }}></i>
          {this.props.name}
        </span>

        <LabelTools
          onActionActivateClick={this.handleActivateLabel}
          onActionRemoveClick={this.toggleActionRemove}
        />

        {this.state.displayRemoveForm ?
          <LabelRemove
            onActionRemoveCancelClick={this.toggleActionRemove}
            onLabelRemove={this.handleLabelRemove}
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
  onActivateLabel: func.isRequired,
  onRemoveLabel: func.isRequired,
};

export default Label;
